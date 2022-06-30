const listItem = document.getElementsByClassName('right-div')

async function fetchItems()
{
    try
    {
        const response = await fetch('https://mdatsev.dev/token-api?offset=0&limit=10')
        if (response.ok)
        {
            const data = await response.json()
            console.log(data.result);
        }

        listItem.innerHTML = data.result.map(item => `
    <div><img src="${item.image}" alt="NFT image"></div>
            <div>
                <div>
                    <a href="">${item.collectionName}</a>
                    <a href="">${item.name}</a>
                </div>
                <div>
                    <div>BUY NOW</div>
                    <a href="">${item.price}</a>
                </div>
                <hr>
                <div>Utility type</div>
                <a href="">${item.utilityType}</a>
            </div>
    `).join('')

    } catch (error)
    {
        console.log('error', error);
    }


}
window.onload = fetchItems

