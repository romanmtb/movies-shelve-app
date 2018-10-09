const addDefaultImg = obj => {
  console.log(obj);
  obj.forEach(item => {
    item.img = 'https://semantic-ui.com/images/wireframe/image.png';
  });
  return obj;
};

export default addDefaultImg;
