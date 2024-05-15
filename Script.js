let box = document.querySelector('.box')

function show(movieslar){
    box.innerHTML = '';

    for(i = 0; i < movies.length; i++){
        let div = document.createElement('div');
        div.classList.add('div');
    
        let language = document.createElement('p');
        language.classList.add('language')
    language.textContent = 'Language - ' + movieslar[i].language;
    
        let p = document.createElement('p');
        p.classList.add('p')
        p.textContent =  movieslar[i].summary;

        let num = document.createElement('div');
        num.classList.add('num');
        num.textContent = i + 1;
    
        let a = document.createElement('a');
        a.classList.add('a')
a.href = 'https://www.youtube.com/watch?v=' + movieslar[i].ytid;
        a.textContent = 'Youtobe Trailer'
        a.target = '_blank'
    
        let div2 = document.createElement('div');
        div2.classList.add('div2')
        div2.textContent = movieslar[i].imdb_rating;
    
        let h2 = document.createElement('h2');
        h2.classList.add('h2')
        h2.textContent = movieslar[i].fulltitle;
        
        let ol = document.createElement('ol')
        ol.classList.add('ol');
    
        for(x = 0; x < movieslar[i].Categories.split('|').length; x++){
            let li = document.createElement('li');
            li.classList.add('li');
            li.textContent =  movieslar[i].Categories.split('|')[x];
    
            ol.appendChild(li);
        }
    
        div.appendChild(div2)
        div.appendChild(num)
        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(ol)
        div.appendChild(a)
        div.appendChild(language) 
    
        box.appendChild(div)
    }
}
show(movies)

let form = document.querySelector('.form');
let input = document.querySelector('.input');
let input2 = document.querySelector('.input2');
let input3 = document.querySelector('.input3');
let select = document.querySelector('.sort');

form.addEventListener('submit', function(evt){
    evt.preventDefault();

    let qiymat = input.value;
    let yil1 = Number(input2.value);
    let yil2 = Number(input3.value);
    let kalit = new RegExp(qiymat, 'gi');

    let qidirilganlar = movies.filter(function(x){
        if(yil1 === 0 && yil2 !== 0){
            return x.Title.toString().match(kalit) && x.movie_year === yil2;
        } else if (yil2 === 0 && yil1 !== 0){
            return x.Title.toString().match(kalit) && x.movie_year === yil1;
        } else if(yil2 === 0 && yil1 === 0) {
            return x.Title.toString().match(kalit);
        } else {
            return x.Title.toString().match(kalit) && (x.movie_year >= yil1 && x.movie_year <= yil2);
        }
    });

    let sortType = select.value;

    if(sortType === 'rating'){
        qidirilganlar.sort(function(film1, film2){
            if(film1.imdb_rating < film2.imdb_rating){
                return 1;
            } else {
                return -1;
            }
        });
    } else {
        qidirilganlar.sort(function(film1, film2){
            if(film1.Title > film2.Title){
                return 1;
            } else {
                return -1;
            }
        });
    }

    show(qidirilganlar);
});