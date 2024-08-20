const upScaleBtn = document.getElementById('js_upScale')
const downScaleBtn = document.getElementById('js_downScale')

const algoBtn1 = document.getElementById('js_algo1')
const algoBtn2 = document.getElementById('js_algo2')
const algoBtn3 = document.getElementById('js_algo3')

const inputWidth = document.getElementById('js_width')
const inputHeight = document.getElementById('js_height')

const inputUplaod = document.getElementById('js_inputUpload')

const startBtn = document.getElementById('js_startBtn')
const cancelBtn = document.getElementById('js_cancelBtn')

//state
let uploadFile

let activeScaleBox = 'js_upScale'

let activeAlgoBtns = 'js_algo1'

let widthHeight = [800, 800]

let estimateTimer = [30000, 30000, 900000]

//initial value
document.getElementById('js_estimateTime').textContent = convertMilliSeconds(
    estimateTimer[0]
)

//button clicks
startBtn.addEventListener('click', () => {
    let algo
    let scaleType
    //don't hide this when the viewport is for pc or 1024px +
    if (window.innerWidth < 1024) {
        document.getElementById('js_config').style.display = 'none'
    }

    if (activeAlgoBtns == 'js_algo1') {
        algo = 'INTER_AREA'
        //best for effective downscale
    } else if (activeAlgoBtns == 'js_algo2') {
        algo = 'INTER_CUBIC'
        //best for sharp picture, best for both
    } else if (activeAlgoBtns == 'js_algo3') {
        algo = 'INTER_LANCZOS4'
        //best for high-quality downscale, also effective for upscale
    } else {
        alert('Algorithm is wrong!!')
    }

    if (activeScaleBox == 'js_upScale') {
        scaleType = 'upscale'
    } else if (activeScaleBox == 'js_upScale') {
        scaleType = 'downscale'
    }

    //send information : formData to backend, property image
    let formData = new FormData()
    //send data picture
    //send type downscale or upScale
    //send algorithm type : 1, 2, 3
    //send width,height:
    formData.append('width', `${widthHeight[0]}`)
    formData.append('height', `${widthHeight[1]}`)
    formData.append('image', uploadFile)
    formData.append('algo', `${algo}`)
    formData.append('scale', `${scaleType}`)

    //console.log(widthHeight[0], widthHeight[1])
    fetch('/api/v1/images', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                //console.log('File process successfully')

                return response.blob()
            } else {
                console.log('Error in response:', response.statusText)
            }
        })
        .then((blob) => {
            let downloadBtn = document.getElementById('js_download')
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `processed_image_return_${Math.floor(Math.random() * 1000000)}.jpg`
            a.textContent = 'DOWNLOAD'
            document.body.appendChild(a)
            downloadBtn.appendChild(a)
            a.click()

            //window.URL.revokeObjectURL(url)
        })
        .catch((err) => console.log('Error:', err))
})

cancelBtn.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
        document.getElementById('js_config').style.display = 'flex'
    }
})

//scale btns
upScaleBtn.addEventListener('click', () => {
    //console.log('scale up')
    activeScaleBox = 'js_upScale'
    upScaleBtn.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeScaleBox == 'js_upScale'
    )
    downScaleBtn.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeScaleBox == 'js_downScale'
    )
})

downScaleBtn.addEventListener('click', () => {
    //console.log('scale down')
    activeScaleBox = 'js_downScale'
    downScaleBtn.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeScaleBox == 'js_downScale'
    )
    upScaleBtn.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeScaleBox == 'js_upScale'
    )
})

//algo btns
algoBtn1.addEventListener('click', () => {
    //console.log('Algo 1')
    activeAlgoBtns = 'js_algo1'
    algoBtn1.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo1'
    )
    algoBtn2.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo2'
    )
    algoBtn3.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo3'
    )
    document.getElementById('js_estimateTime').textContent =
        convertMilliSeconds(estimateTimer[0])
})
algoBtn2.addEventListener('click', () => {
    //console.log('Algo 2')
    activeAlgoBtns = 'js_algo2'
    algoBtn1.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo1'
    )
    algoBtn2.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo2'
    )
    algoBtn3.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo3'
    )
    document.getElementById('js_estimateTime').textContent =
        convertMilliSeconds(estimateTimer[1])
})
algoBtn3.addEventListener('click', () => {
    //console.log('Algo 3')
    activeAlgoBtns = 'js_algo3'
    algoBtn1.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo1'
    )
    algoBtn2.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo2'
    )
    algoBtn3.classList.toggle(
        'body_config_wrapper_boxes_btn_active',
        activeAlgoBtns == 'js_algo3'
    )
    document.getElementById('js_estimateTime').textContent =
        convertMilliSeconds(estimateTimer[2])
})

//inputs
inputWidth.addEventListener('keyup', (e) => {
    widthHeight[0] = e.target.value
})
inputHeight.addEventListener('keyup', (e) => {
    widthHeight[1] = e.target.value
})

//upload
inputUplaod.addEventListener('change', (e) => {
    //console.log(e.target.files[0])
    //create FormData
    uploadFile = e.target.files[0]
})

//utils
function convertMilliSeconds(ms) {
    let second = (ms / 1000) % 60
    let minute = ms / 1000 / 60

    return `${Math.floor(minute)} mins ${second} seconds`
}
