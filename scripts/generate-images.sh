#!/bin/bash

# This script generates placeholder SVG images for all listings

IMAGES_DIR="/Users/justinkeith/Desktop/mm-land-company/public/images/listings"

# Function to create a generic forest image
create_forest_image() {
  local filename=$1
  local title=$2
  cat > "$IMAGES_DIR/$filename" << 'EOF'
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="forestBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#8cc08c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d6b2d;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#forestBg)"/>
  <path d="M0,500 Q200,480 400,490 T800,500 L800,600 L0,600 Z" fill="#1f4a1f"/>
  <g opacity="0.5">
    <polygon points="200,400 170,460 230,460" fill="#163416"/>
    <rect x="195" y="460" width="10" height="40" fill="#663300"/>
  </g>
  <g opacity="0.5">
    <polygon points="350,380 315,450 385,450" fill="#163416"/>
    <rect x="345" y="450" width="10" height="50" fill="#663300"/>
  </g>
  <g opacity="0.5">
    <polygon points="550,390 520,455 580,455" fill="#163416"/>
    <rect x="545" y="455" width="10" height="45" fill="#663300"/>
  </g>
</svg>
EOF
}

# Create all missing images
create_forest_image "oak-meadow-1.jpg" "Oak Meadow"
create_forest_image "oak-meadow-2.jpg" "Oak Meadow"
create_forest_image "oak-meadow-3.jpg" "Oak Meadow"
create_forest_image "oak-meadow-4.jpg" "Oak Meadow"
create_forest_image "sweetgum-1.jpg" "Sweetgum Ridge"
create_forest_image "river-bend-1.jpg" "River Bend"
create_forest_image "river-bend-2.jpg" "River Bend"
create_forest_image "river-bend-3.jpg" "River Bend"
create_forest_image "hickory-grove-1.jpg" "Hickory Grove"
create_forest_image "hickory-grove-2.jpg" "Hickory Grove"
create_forest_image "longleaf-1.jpg" "Longleaf Legacy"
create_forest_image "longleaf-2.jpg" "Longleaf Legacy"
create_forest_image "longleaf-3.jpg" "Longleaf Legacy"
create_forest_image "mossy-creek-1.jpg" "Mossy Creek"
create_forest_image "mossy-creek-2.jpg" "Mossy Creek"
create_forest_image "whispering-pines-1.jpg" "Whispering Pines"
create_forest_image "turkey-creek-1.jpg" "Turkey Creek"
create_forest_image "turkey-creek-2.jpg" "Turkey Creek"
create_forest_image "turkey-creek-3.jpg" "Turkey Creek"
create_forest_image "deer-haven-1.jpg" "Deer Haven"
create_forest_image "heritage-hills-1.jpg" "Heritage Hills"
create_forest_image "heritage-hills-2.jpg" "Heritage Hills"
create_forest_image "heritage-hills-3.jpg" "Heritage Hills"
create_forest_image "heritage-hills-4.jpg" "Heritage Hills"

echo "All placeholder images generated successfully!"
