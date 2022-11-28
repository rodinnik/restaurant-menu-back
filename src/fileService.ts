import * as uuid from "uuid";
import * as path from "path";
import fileUpload from "express-fileupload";
class FileService {
  async saveFile(file: any) {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve("static", fileName);
      file.image.mv(filePath);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}
export default new FileService();
