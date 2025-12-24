.PHONY: install dev build preview deploy update-gh-pages clean

# Install dependencies
install:
	npm install

# Run development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Build and deploy to GitHub Pages (updates gh-pages branch)
deploy:
	npm run deploy

# Alias for deploy - updates gh-pages branch with latest build
update-gh-pages:
	npm run deploy

# Clean build artifacts
clean:
	rm -rf dist node_modules

convert-carousel-movs:
	for file in ./public/carousel/*.mov; do ffmpeg -i "$file" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${file%.mov}.webm"; done
