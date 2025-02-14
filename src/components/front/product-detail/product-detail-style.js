export const mainProdImgStyle = (width, height, isCover = true) => {
  return {
    width: width ? width : '100%',
    maxHeight: height ? height : '635px',
    objectFit: isCover ? 'cover' : undefined,
  };
};

export const similarProdsImgStyle = (productLength) => {
  return {
    left: '0px',
    display: 'grid',
    gridTemplateColumns: `repeat(${productLength}, 306px)`,
    columnGap: '24px',
    whiteSpace: 'nowrap',
    transitionDuration: '0.5s',
  };
};