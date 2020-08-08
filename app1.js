(function () {
    let data = {
        noOfDiv: 30,
        divWidth: 100,
        previousTransformHeight: []
    };
    let init = function () {
        let noOfColumns = controller.getNoOfColumns();
        controller.renderDivs();
        controller.translateDivs(noOfColumns);
        let blogContainer = document.getElementById('blogs-container');
   
        window.addEventListener('resize', function() {
            let noOfColumns = controller.getNoOfColumns();
            console.log('noOfColumns: ', noOfColumns);

            blogContainer.style.width = noOfColumns * data.divWidth;
            controller.translateDivs(noOfColumns);
        })
    };
    let controller = {
        renderDivs: function() {
            let blogContainer = document.getElementById('blogs-container');
            for (let i = 0; i<data.noOfDiv; i++) {
                let blogElement = document.createElement('div');
                blogElement.className = 'blogs';
                blogElement.style.height = this.getRandomHeight();
                blogContainer.appendChild(blogElement);
            }
        },
        translateDivs: function(noOfColumns) {
            let blogContainer = document.getElementById('blogs-container');
            let maxWidth = noOfColumns * data.divWidth;
            let width = 0;
            for (let i = 0; i<data.noOfDiv; i++) {
                let previousHeight = 0;
                previousHeight = parseInt(blogContainer.children[i].style.height);
                data.previousTransformHeight[i] = previousHeight;
                if ((i - noOfColumns) >= 0) {
                    if (data.previousTransformHeight[(i - noOfColumns)]) {
                        previousHeight = data.previousTransformHeight[i-noOfColumns];
                        data.previousTransformHeight[i] = parseInt(blogContainer.children[i].style.height) + data.previousTransformHeight[i-noOfColumns];;
                    }
                    blogContainer.children[i].style.transform = `translate(${width}px, ${previousHeight}px)`;
                } else  {
                    blogContainer.children[i].style.transform = `translate(${width}px)`;
                }
                width+= blogContainer.children[i].offsetWidth;
                if ((width) >= maxWidth) {
                    width = 0;
                }
            }
        },
        getNoOfColumns: function() {
            console.log('document.documentElement.clientWidth: ', document.documentElement.clientWidth);
            return Math.floor(document.documentElement.clientWidth / data.divWidth);

        },
        getRandomHeight: function() {
            return Math.floor(Math.random() * (400 - 100) + 100);
        }

    }
    init();
})();