export default {
  setImage(
    product,
    imageWidth,
    imageRatio,
    imageLabelName = false,
    hasCarousel = false,
  ) {
    let imageUrlFront = product.items[0].images[0].imageUrl;
    let imageUrlBack = !Sestini.globalHelpers.isUndefined(
      product.items[0].images[1],
    )
      ? product.items[0].images[1].imageUrl
      : imageUrlFront;

    imageUrlFront = Sestini.vtexHelpers.getResizeImageByRatio(
      imageUrlFront,
      'width',
      imageWidth,
      imageRatio,
    );
    imageUrlBack = Sestini.vtexHelpers.getResizeImageByRatio(
      imageUrlBack,
      'width',
      imageWidth,
      imageRatio,
    );

    const setImageSrc = (imageUrl, hasCarousel) => (!hasCarousel ? `data-src="${imageUrl}"` : `data-lazy="${imageUrl}"`);
    const setImageClass = (imageType, hasCarousel) => (!hasCarousel
      ? `x-shelf__img-${imageType} has--lazy has--placeloader js--lazy`
      : `x-shelf__img-${imageType} has--placeloader`);

    let imageLabel = {};
    if (imageLabelName) {
      imageLabel = Sestini.globalHelpers.objectSearch(product, {
        imageLabel: imageLabelName,
      });
      imageUrlFront = imageLabel.imageUrl
        ? imageLabel.imageUrl
        : imageUrlFront;
    }

    const frontMarkup = `
            <img class="${setImageClass('front', hasCarousel)}"
                src="${Sestini.baseImage}"
                ${setImageSrc(imageUrlFront, hasCarousel)}
                alt="${product.productName}"
                title="${product.productName}" />`;

    const backMarkupSingle = `
            <img class="${setImageClass('back', hasCarousel)}"
                src="${Sestini.baseImage}"
                ${setImageSrc(imageUrlBack, hasCarousel)}"
                alt="${product.productName}"
                title="${product.productName}" />`;


    return !Sestini.isMobile
      ? `${frontMarkup} ${backMarkupSingle}`
      : frontMarkup;
  },
};
