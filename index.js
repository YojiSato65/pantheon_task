const listItem = document.querySelector('.right-div')
const spinner = document.querySelector('.spinner-div')

async function fetchItems()
{
    try
    {
        const response = await fetch('https://mdatsev.dev/token-api?offset=0&limit=10')
        if (response.ok)
        {
            const data = await response.json()
            console.log(data.result);

            listItem.innerHTML = data.result.map(item => `
        <div class='item-div'>
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
        </div>
        `).join('')
        }
    } catch (error)
    {
        console.log('error', error);
        alert('Something went wrong. Please reload the page.')
    } finally
    {
        spinner.classList.add('d-none')
    }


}

window.onload = fetchItems