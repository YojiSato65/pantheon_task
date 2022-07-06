// const listItems = document.querySelector('.right-div')
// const spinner = document.querySelector('.spinner-div')

// async function fetchItems()
// {
//     try
//     {
//         const response = await fetch('https://mdatsev.dev/token-api?offset=0&limit=10')
//         if (response.ok)
//         {
//             const data = await response.json()
//             console.log(data.result);

//             listItems.innerHTML = data.result.map(item => `
//         <div class='item-div'>
//             <div class='item-image-div'>
//                 <img src="${item.image.includes('seadn.io') ? item.image : null}" alt="NFT image">
//             </div>
//             <div class='item-description-div'>
//                 <div class='item-name-div'>
//                     <div>
//                         <p>${item.collectionName}</p>
//                         <i class="fa-regular fa-circle-check"></i>
//                     </div>
//                     <h5>${item.name}</h5>
//                 </div>
//                 <div class='item-price-div'>
//                     <p>BUY NOW</p>
//                     <h5>${item.price * 100000 > 5 ? item.price.toFixed(3) : item.price.toFixed(5)} ETH</h5>
//                 </div>
//             </div>
//                 <hr>
//             <div class='item-utility-div'>
//                 <p>Utility type</p>
//                 <h5>${item.utilityType}</h5>
//             </div>
//         </div>
//         `).join('')
//         }
//     } catch (error)
//     {
//         console.log(error.message);
//         alert('An error occurred. Click OK to reload the page.')
//     } finally
//     {
//         spinner.classList.add('d-none')
//     }
// }

// window.onload = fetchItems



(function ()
{
    const listItems = document.querySelector('.item-list-div')
    const spinner = document.querySelector('.infinite-spinner-div')

    const getItems = async (page, limit) =>
    {
        const API_URL = 'https://mdatsev.dev/token-api?offset=0&limit=10';
        const response = await fetch(API_URL);
        // handle 404
        if (!response.ok)
        {
            throw new Error(`An error occurred: ${response.status}`);
        }
        return await response.json();
    }

    const showItems = (items) =>
    {
        items.map(item =>
        {
            const itemEl = document.createElement('div');
            itemEl.classList.add('item-div');

            itemEl.innerHTML = `
            <div class='item-image-div'>
                <img src="${item.image.includes('seadn.io') ? item.image : null}" alt="NFT image">
            </div>
            <div class='item-description-div'>
                <div class='item-name-div'>
                    <div>
                        <p>${item.collectionName}</p>
                        <i class="fa-regular fa-circle-check"></i>
                    </div>
                    <h5>${item.name}</h5>
                </div>
                <div class='item-price-div'>
                    <p>BUY NOW</p>
                    <h5>${item.price * 100000 > 5 ? item.price.toFixed(3) : item.price.toFixed(5)} ETH</h5>
                </div>
            </div>
                <hr>
            <div class='item-utility-div'>
                <p>Utility type</p>
                <h5>${item.utilityType}</h5>
            </div>
        `;

            listItems.appendChild(itemEl);
        });
    };

    const hideLoader = () =>
    {
        spinner.classList.add('d-none');
    };

    const showLoader = () =>
    {
        spinner.classList.add('show');
    };

    const loadItems = async () =>
    {
        showLoader();

        try
        {
            const response = await getItems();
            showItems(response.result);
        } catch (error)
        {
            console.log(error.message);
            console.log('will try fetch again');
            hideLoader()
            loadItems()
        } finally
        {
            hideLoader();
        }

    };

    window.addEventListener('scroll', () =>
    {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        loadItems();
    }, {
        passive: true
    });

    // initialize
    loadItems();

})();