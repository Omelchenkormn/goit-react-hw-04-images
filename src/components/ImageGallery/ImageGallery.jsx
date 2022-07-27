import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
export const ImageGallery = ({ items, getFullImg }) => {
  return (
    <List>
      {items.map(item => {
        return (
          <ImageGalleryItem key={item.id} item={item} getFullImg={getFullImg} />
        );
      })}
    </List>
  );
};
