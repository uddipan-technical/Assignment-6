      const imagesArea = document.querySelector('.images');
      const gallery = document.querySelector('.gallery');
      const galleryHeader = document.querySelector('.gallery-header');
      const searchBtn = document.getElementById('search-btn');
      const sliderBtn = document.getElementById('create-slider');
      const searchEnter = document.getElementById('search');
      const sliderContainer = document.getElementById('sliders');
      const duration = document.getElementById('duration');
      // selected image
      let sliders = [];

      // If this key doesn't work
      // Find the name in the url and go to their website
      // to create your own api key
      const KEY = '15674931-a9d714b6e9d654524df198e00&q';

      // show images
          const showImages = images => {
          imagesArea.style.display = 'block';
          gallery.innerHTML = '';
          // show gallery title
          galleryHeader.style.display = 'flex';
          images.forEach(image => {
              let div = document.createElement('div');
              div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
              div.innerHTML = ` 
              <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">
              <p>${image.tags}</p>`;
              gallery.appendChild(div);
          });
          spinner(false);
          };

          const getImages = query => {
          spinner(true);
          fetch(
              `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`
          )
              .then(response => response.json())
              .then(data => showImages(data.hits))
              .catch(err => console.log(err));
         };

      // Toggle adding and removing
         let slideIndex = 0;
         const selectItem = (event, img) => {
          let element = event.target;
          const toggleSystem = element.classList.toggle('added');
          let item = sliders.indexOf(img);
          if (item !== -1) {
              sliders.splice(item, 1);
          }
           else {
              sliders.push(img);
          }
          countSlide(toggleSystem);
         };

          let timer = 0;
          const createSlider = () => {
          // check slider image length
          if (sliders.length < 2) {
              alert('Select at least 2 image');
              return;
          }
          if (duration.value < 0) {
              alert('Please enter a positive value');
              duration.value = '';
              return;
          }

          // create slider previous next area
          sliderContainer.innerHTML = '';
          const prevNext = document.createElement('div');
          prevNext.className =
              'prev-next d-flex w-100 justify-content-between align-items-center';
          prevNext.innerHTML = `
         <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
         <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
         `;

          sliderContainer.appendChild(prevNext);
          document.querySelector('.main').style.display = 'block';
          // hide image aria
          imagesArea.style.display = 'none';
          const sliderDuration = duration.value || 1000;
          sliders.forEach(slide => {
              let item = document.createElement('div');
              item.className = 'slider-item';
              item.innerHTML = `<img class="w-100"
            src="${slide}"
            alt="">`;
              sliderContainer.appendChild(item);
          });
          changeSlide(0);
          timer = setInterval(function () {
              slideIndex++;
              changeSlide(slideIndex);
           }, sliderDuration);
         };

      // change slider index
        const changeItem = index => {
          changeSlide((slideIndex += index));
        };

      // change slide item
         const changeSlide = index => {
          const items = document.querySelectorAll('.slider-item');
          if (index < 0) {
              slideIndex = items.length - 1;
              index = slideIndex;
          }

          if (index >= items.length) {
              index = 0;
              slideIndex = 0;
          }

          items.forEach(item => {
              item.style.display = 'none';
          });

          items[index].style.display = 'block';
      };

      // for showing images after click search button 
          const showImage = () => {
          document.querySelector('.main').style.display = 'none';
          clearInterval(timer);
          const search = document.getElementById('search');
          getImages(search.value);
          sliders.length = 0;
        };
      // Press Enter key
      searchEnter.addEventListener('keyup', function (event) {
          if (event.which === 13) {
              showImage();
          }
        });


      searchBtn.addEventListener('click', function () {
          showImage();
          document.getElementById('select-img').innerText = '0';
      });

      sliderBtn.addEventListener('click', function () {
          createSlider();
      });

      // Adding spinner
      const spinner = showSpin => {
          const spinner = document.getElementById('spinner');
          if (showSpin) {
              spinner.classList.remove('d-none');
          } else {
              spinner.classList.add('d-none');
          }
      };

      // slider images
          const countSlide = isTrue => {
          const count = document.getElementById('select-img').innerText;
          let slideCount = parseInt(count);
          if (isTrue) {
              document.getElementById('select-img').innerText = slideCount + 1;
          } else {
              document.getElementById('select-img').innerText = slideCount - 1;
          }
      };









