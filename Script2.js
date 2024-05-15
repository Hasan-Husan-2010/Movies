let main = document.querySelector('.main');
function show(movielar){
    for(let x = 0; x < movielar.length; x++){
        let box = document.createElement('div');
        box.classList.add('box');
        let Sarlavha = document.createElement('h3');
        Sarlavha.classList.add('h3');
        Sarlavha.textContent = movielar[x].Title;
        let raiting = document.createElement('p');
        raiting.classList.add('raiting');
        raiting.textContent = movielar[x].imdb_rating;
        let year = document.createElement('p');
        year.textContent = movielar[x].movie_year;
        let link = document.createElement('a');
        link.classList.add('a');
        link.href = 'https://www.youtube.com/watch?' + movielar[x].ytid;
        link.textContent = 'Youtube Trailer';
        link.target = '_blank';
        let imbd_link = document.createElement('a');
        imbd_link.classList.add('a2');
        imbd_link.href = 'https://www.imdb.com/title/' + movielar[x].imdb_id;
        imbd_link.textContent = 'Imbd info';
        imbd_link.target = '_blank';
        let num = document.createElement('p');
        num.classList.add('num');
        num.textContent = x + 1;
        let summary = document.createElement('p');
        summary.classList.add('summary');
        summary.textContent = movielar[x].summary;
        let ol = document.createElement('ol')
        ol.classList.add('ol');
        let div = document.createElement('div');
        div.classList.add('df');
        
    for(let i = 0; i < movielar[x].Categories.split('|').length; i++){
        let li = document.createElement('li');
        li.classList.add('li');
        li.textContent =  movielar[x].Categories.split('|')[i];
        
        ol.appendChild(li);
    }
        div.appendChild(raiting);
        div.appendChild(num);
        box.appendChild(div);
        box.appendChild(Sarlavha);
        box.appendChild(summary)
        box.appendChild(year);
        box.appendChild(link);
        box.appendChild(imbd_link);
        box.appendChild(ol);
        main.appendChild(box);
    }
}
show(movies)
let form = document.querySelector('.form');
let inp = document.getElementById('inp');
let inp2 = document.getElementById('inp2');
let inp3 = document.getElementById('inp3');
let select = document.querySelector('.sort');
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    main.innerHTML = '';
    let val = inp.value;
    let yil1 = Number(inp2.value);
    let yil2 = Number(inp3.value);
    let key = new RegExp(val, 'gi');
    let searched = movies.filter(function(x){
    if(yil1 === 0 && yil2 !== 0){
        return x.Title.toString().match(key) && x.movie_year === yil2;
    } else if (yil2 === 0 && yil1 !== 0){
        return x.Title.toString().match(key) && x.movie_year === yil1;
    } else if(yil2 === 0 && yil1 === 0) {
        return x.Title.toString().match(key);
    } else {
        return x.Title.toString().match(key) && (x.movie_year >= yil1 && x.movie_year <= yil2);
    }
    });
    let Type = select.value;
    if(Type === 'rating'){
        searched.sort(function(film1, film2){
            if(film1.imdb_rating < film2.imdb_rating){
                return 1;
            } else {
                return -1;
            }
        });
    } else {
        searched.sort(function(film1, film2){
            if(film1.Title > film2.Title){
                return 1;
            } else {
                return -1;
            }
        });
    }
    show(searched);
});