# Image Carousel Component

## Overview

This project implements an image carousel component that cycles through images fetched from an endpoint. The carousel automatically displays a new image every 3 seconds, and users can manually navigate through the images using previous/next buttons.

### Prompt

Create an image carousel that cycles through images fetched from an endpoint (displaying a new image every 3 seconds) and allows the user to skip to the next/previous image.

### Example Endpoint Data Structure

```json
{
  "data": {
    "children": [
      {
        "data": {
          "url_overridden_by_dest": "*.jpg"
        }
      }
    ]
  }
}

## Approach

1. Fetching Images
We used the https://picsum.photos/ API to fetch random images. The endpoint provides randomly generated images of the same dimensions (800x400), ensuring a consistent look and feel for the carousel.
Initially, we preloaded a set of 15 images to ensure that the user experience is smooth even when the carousel auto-plays or the user rapidly clicks the navigation buttons.

2. Auto-play Functionality
The carousel automatically cycles through images every 3 seconds using the setInterval function.
The interval is cleared if the user manually interacts with the carousel, ensuring a smooth and controlled user experience.

3. Navigation and Image Preloading
Navigation arrows allow users to manually skip to the previous or next image.
When the user navigates to the next image and is approaching the end of the preloaded images (less than 3 remaining), the carousel automatically preloads an additional set of images.
Images are lazy-loaded, meaning they are only fetched when needed. This reduces unnecessary bandwidth usage and speeds up initial load times.

4. Responsive Design
The carousel is horizontally centered and adapts to various screen sizes.
The currently active image is always centered within the viewport, ensuring optimal visibility.
The component is styled using SCSS with breakpoints for different screen sizes to ensure a consistent and responsive layout.

5. Smooth Visual Transitions
We utilized framer-motion to animate the image transitions, ensuring a smooth and visually appealing experience.
A blur effect is applied to images while they are loading, providing a seamless transition as images load.
6. Optimizations

Lazy Loading: Images are lazy-loaded using the loading="lazy" attribute, reducing the initial load time.
Efficient State Management: We used Zustand for managing carousel state, keeping the code clean and efficient. The carousel state includes the current index, images array, auto-play status, and interval duration.
Avoiding Index Resets: We ensured that the carousel does not reset to the first image after reaching the end but instead continues by adding more images dynamically.

## Project Structure

ImageCarousel.tsx: The main carousel component that handles the fetching, rendering, and auto-play functionality.
Card.tsx: A reusable card component that displays each image. It includes lazy loading and blur effects for smooth image loading.
CarouselControls.tsx: A component for the left and right navigation arrows.
useCarouselStore.ts: Zustand store for managing the carousel's state (e.g., current index, images array, auto-play status).
Loader.tsx: A simple loader component displayed while images are being fetched.