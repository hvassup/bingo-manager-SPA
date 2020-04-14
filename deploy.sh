git pull
ng build --base-href /bingo/
rm /var/www/bingo-manager-SPA/
cp -r dist/ /var/www/bingo-manager-SPA/
