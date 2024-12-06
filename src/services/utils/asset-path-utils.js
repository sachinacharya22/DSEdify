import images from "@/constants/images";

const getImagePath = (path) => require(`../../assets/${path}`);

export const getImageByKey = (key) => {
  if (images[key]) {
    return getImagePath(images[key]);  
  }
  return null;
};
