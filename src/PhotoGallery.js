import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import SelectedImage from './SelectedImage';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  FormInput,
  InputGroup
} from "shards-react";
import photos from "./photo-list/photoList";
import './react-photo-gallery.css';

function PhotoGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [enableSelection, setEnableSelection] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ index, left, top, key, photo }) => (
    <SelectedImage
      onSelect={onSelect}
      key={key}
      margin={"2px"}
      index={index}
      photo={photo}
      left={left}
      top={top}
      selected={selectedImages.some(idx => idx === index)}
    />
  );

  const onSelect =  (index, isSelected) => {
    setSelectedImages(isSelected ?
      [...selectedImages, index] : selectedImages.filter(idx => idx !== index)
    );
  }

  const doneSelecting = () => {
    setEnableSelection(false);
  }

  return (
    <div>
      <h2>Gallery</h2>
      <ButtonToolbar>
        <ButtonGroup size="sm">
        {!enableSelection && <Button onClick={() => setEnableSelection(true)}>Select</Button>}
        {enableSelection && <Button onClick={doneSelecting}>Done</Button>}
        </ButtonGroup>
        <InputGroup size="sm" className="ml-auto">
          <FormInput placeholder="Search..." />
        </InputGroup>
      </ButtonToolbar>
      <Gallery photos={photos} onClick={openLightbox} renderImage={enableSelection ? imageRenderer : null}/>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default React.memo(PhotoGallery)
