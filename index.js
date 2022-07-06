
(function ()
{
    const listItems = document.querySelector('.item-list-div')
    const spinner = document.querySelector('.infinite-spinner-div')

    const getItems = async () =>
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

        console.log(items);
        items.map(item =>
        {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-div');

            itemDiv.innerHTML = `
            <div class='item-image-div'>
                <img id='img' src="${item.image}" alt="NFT image" >
            </div >
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
                    <h5>${item.price * 100000 > 5 ? item.price.toFixed(3) : item.price.toFixed(5)} ETH</h5 >
                </div >
            </div >
        <hr>
            <div class='item-utility-div'>
                <p>Utility type</p>
                <h5>${item.utilityType}</h5>
            </div>
            `;

            listItems.appendChild(itemDiv);
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
            hideLoader()
            loadItems()
        } finally
        {
            hideLoader();
        }
    };

    window.addEventListener('scroll', () => { loadItems() }, { passive: true }
    );

    // initialize
    loadItems();
})();


