import { Injectable } from '@nestjs/common';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from '@firebase/storage';

@Injectable()
export class FirebaseStorageProvider {
  async upload(file: Express.Multer.File, userId: string) {
    const filePath = new Date().valueOf();
    const storage = getStorage();
    const fileExtension = file.originalname.split('.').pop();
    const fileRef = ref(storage, `${userId}/${filePath}.${fileExtension}`);
    const uploaded = await uploadBytesResumable(fileRef, file.buffer);
    return getDownloadURL(uploaded.ref);
  }
}
