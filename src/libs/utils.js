import moment from "moment";

export const getFormatString = (str_date) => {
  return moment(new Date(str_date)).format("YYYY-MM-DD HH:mm");
};

export const getFileType = (str_url = "") => {
  // Get the substring after (.)
  const filename = str_url.toLowerCase();
  const ext = filename.substr(filename.lastIndexOf("."));

  // Checking types of extension and return file type
  if (ext === ".txt" || ext === ".csv" || ext === ".tsv") {
    return "text";
  } else if (
    ext === ".png" ||
    ext === ".jpg" ||
    ext === ".jpeg" ||
    ext === ".gif"
  ) {
    return "image";
  } else if (ext === ".pdf") {
    return "pdf";
  } else if (ext === ".mp3" || ext === ".wav" || ext === ".wma") {
    return "audio";
  } else if (
    ext === ".mp4" ||
    ext === ".avi" ||
    ext === ".mov" ||
    ext === ".wmv"
  ) {
    return "video";
  } else if (ext === ".doc" || ext === ".docx") {
    return "document";
  } else if (ext === ".xls" || ext === ".xlsx") {
    return "spreadsheet";
  } else if (ext === ".ppt" || ext === ".pptx") {
    return "presentation";
  } else if (ext === ".zip" || ext === ".rar" || ext === ".7z") {
    return "archive";
  } else if (ext === ".exe" || ext === ".msi") {
    return "executable";
  } else if (
    ext === ".java" ||
    ext === ".c" ||
    ext === ".py" ||
    ext === ".cpp"
  ) {
    return "code";
  } else {
    return "unknown";
  }
};

export const getImageNameIdx = (str_url_arr = []) => {
  const imageArr = [];
  for (let i = 0; i < str_url_arr.length; i++) {
    if (getFileType(str_url_arr[i]) === "image") {
      imageArr.push(i);
    }
  }

  return imageArr;
};
