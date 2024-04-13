stage-up:
	docker compose -f docker-compose.stage.yml up -d --force-recreate --build &
	docker system prune -af

graphics:
	texture-packer-cli -p assets/assets.tps -n assets -d public/assets -e
	move .\public\assets\assets.ts .\src\game\resources
	sharp -i ./public/assets/*.png -o ./public/assets -f webp --nearLossless true
