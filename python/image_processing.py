import sys
import cv2 as cv



def img_process(inputPath, outputPath, w, h, algo):

    img = cv.imread(inputPath);
    if img is None:
        print(f"Error: Unable to read image from {input_path}")
        return
    
    width = int(w)
    height = int(h)
    
    output_image = None

    if algo == "INTER_AREA":
        output_image = cv.resize(img, (width, height), interpolation=cv.INTER_LINEAR);
    elif algo == "INTER_CUBIC":
        output_image = cv.resize(img, (width, height), interpolation=cv.INTER_CUBIC);
    else:
        output_image = cv.resize(img, (width, height), interpolation=cv.INTER_LANCZOS4);


    cv.imwrite(outputPath, output_image);



if __name__ == '__main__':
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    w = sys.argv[3]
    h = sys.argv[4]
    algo = sys.argv[5]
    img_process(input_path, output_path, w, h, algo);
