document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'E8If794rtQHUy2SqCBIer5H9cmIObHpKJIQMyd1W';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
    let photoIndex = 0;
    const maxPhotos = 10;

    function fetchPhotos() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const photos = data.photos.slice(photoIndex, photoIndex + maxPhotos);
                const carouselContent = document.getElementById('carouselContent');
                photos.forEach((photo, index) => {
                    const isActive = photoIndex === 0 && index === 0 ? 'active' : '';
                    const carouselItem = `
                        <div class="carousel-item ${isActive}">
                            <img src="${photo.img_src}" class="d-block w-100" alt="Mars Image ${photoIndex + index + 1}">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${photo.rover.name} Rover</h5>
                                <p>Camera: ${photo.camera.full_name}</p>
                            </div>
                        </div>
                    `;
                    carouselContent.innerHTML += carouselItem;
                });
                document.getElementById('loading').classList.add('d-none');
                document.getElementById('marsCarousel').classList.remove('d-none');
                photoIndex += maxPhotos;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('loading').innerText = 'Failed to load images';
            });
    }

    fetchPhotos();

    document.getElementById('exploreMoreBtn').addEventListener('click', function() {
        fetchPhotos();
        alert('10 more images have been added');
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            $('#marsCarousel').carousel('next');
        } else if (event.key === 'ArrowLeft') {
            $('#marsCarousel').carousel('prev');
        }
    });
});

