.PHONY: install dev build preview deploy clean

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

# Deploy to GitHub Pages
deploy:
	npm run deploy

# Clean build artifacts
clean:
	rm -rf dist node_modules

