import { ListItem, ImgItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, getFullImg }) => {
  const OpenFullImg = () => getFullImg(item.largeImageURL);
  return (
    <>
      <ListItem>
        <ImgItem
          src={item.webformatURL}
          alt={item.largeImageURL}
          onClick={OpenFullImg}
        />
      </ListItem>
    </>
  );
};
