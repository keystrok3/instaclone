
import instagram_logo from '../assets/images/instagram_logo.png';

const LOGO_WIDTH = 175;
const LOGO_HEIGHT = 51;
// Assuming the logo is at the top-left of the sprite.
const LOGO_SPRITE_X = 0;
const LOGO_SPRITE_Y = 0;

// You might need to find the actual dimensions of the sprite sheet.
// For demonstration, let's assume the sprite is larger, e.g., 200x100.
// If you know the actual sprite dimensions, replace spriteWidth and spriteHeight accordingly.
const spriteWidth = 200; // Placeholder: Replace with actual sprite width
const spriteHeight = 100; // Placeholder: Replace with actual sprite height

const InstagramLogo = () => {
  return (
    <div
      style={{
        width: `${LOGO_WIDTH}px`,
        height: `${LOGO_HEIGHT}px`,
        overflow: 'hidden',
        display: 'inline-block', // Or 'block' depending on desired layout
        position: 'relative', // Needed for absolute positioning of the img
      }}
    >
      <img
        src={instagram_logo}
        alt="Instagram"
        style={{
          position: 'absolute',
          top: `-${LOGO_SPRITE_Y}px`, // Use negative values to shift the image up and left
          left: `-${LOGO_SPRITE_X}px`,
          width: `${spriteWidth}px`, // Set img dimensions to the full sprite size
          height: `${spriteHeight}px`,
          // object-fit and object-position are alternatives if you don't use a wrapper div,
          // but they work differently than background-position for sprites.
          // objectFit: 'none', // Use 'none' to prevent scaling
          // objectPosition: `-${LOGO_SPRITE_X}px -${LOGO_SPRITE_Y}px`, // Position within the img element
        }}
      />
    </div>
  );
};

export default InstagramLogo;