import { useEffect, useRef, useState } from "react";
import MediaGallery from "../MediaGallery";

const mainMedia = [
  { type: "image", src: "public/Homegallery 2.jpeg" },
  { type: "image", src: "public/Homegallery 1.jpeg" },
  { type: "image", src: "public/Homegallery 3.jpeg" },
  { type: "image", src: "public/Homegallery 4.jpeg" },
  { type: "image", src: "public/Homegallery 5.jpeg" },
  { type: "image", src: "public/Homegallery 6.jpeg" },
  { type: "image", src: "public/Homegallery 7.jpeg" },
  { type: "image", src: "public/Homegallery 8.jpeg" },
  { type: "image", src: "public/Homegallery 9.jpeg" },
  
  // Add 15+ easily
];


export default function GallerySection() {
  return (
    <MediaGallery
      subtitle="In Action"
      title="Programs Gallery"
      media={mainMedia}
    />
  );
}