1. Create session for user
2. Store image link on the database with user session id
3. process image, store processed image on web storage, store link to that on database
4. let user know their image is done
5. user click download on with their session Id
6. server take that sessionId and get the image
7. after download, delete the session id and image in 1 day time
