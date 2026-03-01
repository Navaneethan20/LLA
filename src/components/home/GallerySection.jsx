import { useEffect, useRef, useState } from "react";
import MediaGallery from "../MediaGallery";

const mainMedia = [
  { type: "image", src: "/Homegallery 2.jpeg" },
  { type: "image", src: "/Homegallery 1.jpeg" },
  { type: "image", src: "/Homegallery 3.jpeg" },
  { type: "image", src: "/Homegallery 4.jpeg" },
  { type: "image", src: "/Homegallery 5.jpeg" },
  { type: "image", src: "/Homegallery 6.jpeg" },
  { type: "image", src: "/Homegallery 7.jpeg" },
  { type: "image", src: "/Homegallery 8.jpeg" },
  { type: "image", src: "/Homegallery 9.jpeg" },
  
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