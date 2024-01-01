<template>
    <h3 style="text-align: center;"> Item List</h3>
    
    <div style="text-align: center; padding: 0; margin: 0;">
        <p>Key</p>
        <p>
            <span style="background-color: green; color: lightgray;">Production Item</span> || 
            <span style="background-color: red; color: lightgray;">Limited Production Item </span>
        </p>
    </div>    
    <div class="tableContainer">
        <table>
            <tr>
                <th class="stringNameCol">String Name</th>
                <th class="itemsCol" colspan="12">Items</th>
            </tr>
            <tr class="tableLevels">
                <th>level:</th>
                <th>Lv. 1</th>
                <th>Lv. 2</th>
                <th>Lv. 3</th>
                <th>Lv. 4</th>
                <th>Lv. 5</th>
                <th>Lv. 6</th>
                <th>Lv. 7</th>
                <th>Lv. 8</th>
                <th>Lv. 9</th>
                <th>Lv. 10</th>
                <th>Lv. 11</th>
                <th>Lv. 12</th>

            </tr>
            <tr>
                <td>Baking</td>
                <td>Grain</td>
                <td>Flour</td>
                <td>Fine Flour</td>
                <td>Dough</td>
                <td style="background-color: green;">Fermented Dough</td>
                <td style="background-color: green;">Sliced Bread</td>
                <td style="background-color: green;">Bread Basket</td>
                <td style="background-color: green;">Premium Oven</td>
            </tr>
            <tr>
                <td>Fields</td>
                <td>Clay</td>
                <td>Fertile Clay</td>
                <td>Field</td>
                <td style="background-color: green;">Fenced Field</td>
                <td style="background-color: green;">Planting Field</td>
                <td style="background-color: green;">Seeding Field</td>
                <td style="background-color: green;">Flowering Field</td>
            </tr>
            <tr>
                <td>Cat Beds</td>
                <td>Leather Collar</td>
                <td>Bowknot Collar</td>
                <td>Cat Food Bowl</td>
                <td>Cute Cat Food Bowl</td>
                <td>Pet Coat</td>
                <td style="background-color: green;">Cat Scratcher</td>
                <td style="background-color: green;">Warm Cat Bed</td>
                <td style="background-color: green;">Cat Cushion</td>
                <td style="background-color: green;">Cute Cat Cushion</td>
                <td style="background-color: green;">Catland</td>
            </tr>
            <tr>
                <td>Sewing</td>
                <td>Sewing Needle</td>
                <td>Sewing Thread</td>
                <td>Yarn Balls</td>
                <td>Sewing Thread Kit</td>
                <td>Sewing Thread Case</td>
                <td>Double Sewing Thread Case</td>
                <td style="background-color: green;">Sewing Thread Basket</td>
                <td style="background-color: green;">Mini Sewing Machine</td>
                <td style="background-color: green;">Manual Sewing Machine</td>
                <td style="background-color: green;">Automatic Sewing Machine</td>
            </tr>
            <tr>
                <td>Food</td>
                <td>Biscuit</td>
                <td>Sandwich Biscuits</td>
                <td>Sandwich Biscuit Selection</td>
                <td>Macaroon</td>
                <td>Cheesecake</td>
                <td>Cream Cake</td>
                <td>Fruit Cake</td>
                <td>Tiramisu</td>
                <td>Celebration Cake</td>
                <td>Limited Mousse Cake</td>
            </tr>
            <tr>
                <td>Pizza</td>
                <td>Pizza Crust</td>
                <td>Tasting Pizza</td>
                <td>Regular Pizza</td>
                <td>Ham Pizza</td>
                <td>Delux Fruit Pizza</td>
            </tr>
            <tr>
                <td>Plants</td>
                <td>Seedling</td>
                <td>Thirving Seedling</td>
                <td>Growing Buds</td>
                <td>Budding Flowers</td>
                <td style="background-color: red;">Blooming Flowers</td>
            </tr>
            <tr>
                <td>Flowers</td>
                <td>Rose</td>
                <td>Rose Gift Box</td>
                <td>Rose Bouquet</td>
                <td>Equisite Rose Bouquet</td>
                <td style="background-color: red;">Selected Rose Basket</td>
            </tr>
            <tr>
                <td>Rose Seating</td>
                <td>Rose Frame</td>
                <td>Rose Wreath</td>
                <td>Rose Bench</td>
                <td>Rose Swing</td>
                <td>Rose Arch</td>
            </tr>
            <tr>
                <td>Frames</td>
                <td>Wood</td>
                <td>Simple Photo Frame</td>
                <td>Souvenir Photo Frame</td>
                <td>Exuisite Photo Frame</td>
            </tr>
            <tr>
                <td>Cat Food</td>
                <td>Fish Bone Toy</td>
                <td>Fish Pillow</td>
                <td>Cat Treats</td>
                <td style="background-color: red;">Canned Fish</td>
                <td>Cat-Shaped Jelly</td>
                <td>Pet Milk</td>
                <td>Premium Cat Food</td>
                <td>Salmon</td>
                <td>Premium Sea Shrimp</td>
                <td>Pet Snack Platter</td>
            </tr>
            <tr>
                <td>Jewlery</td>
                <td>Metal Flakes</td>
                <td>Pearl Earrings</td>
                <td>Diamond Ring</td>
                <td>Flower Bracelet</td>
                <td>Sapphire Pendant</td>
                <td>Swan Brooch</td>
            </tr>
            <tr>
                <td>Lady Clothes</td>
                <td>Cloth</td>
                <td>Cloth in Bulk</td>
                <td>White Veil</td>
                <td>Patterned Stockings</td>
                <td>Luxury Glove</td>
                <td>Flower Beret</td>
                <td>Butterfly Blouse</td>
                <td>Pleated Skirt</td>
                <td>Suspender Dress</td>
                <td>Puffy Princess dress</td>
                <td>Splendid Gown</td>
                <td>Pink Lolita</td>
            </tr>
            <tr>
                <td>Men Clothes</td>
                <td>White T-Shirt</td>
                <td>Beach Shorts</td>
                <td>Plaid Shirt</td>
                <td>Baseball Jacket</td>
                <td>Black Leather Jacket</td>
                <td>Custom Suit</td>
                <td>Vintage Tailcoat</td>
                <td>Ceremony Tuxedo</td>
            </tr>
            <tr>
                <td>Orange Chests</td>
                <td>Workshop Orange Chest</td>
                <td>Rare Orange Chest</td>
                <td style="background-color: red;">Precious Orange Chest</td>
            </tr>
            <tr>
                <td>Pink Chests</td>
                <td>Workshop Pink Chest</td>
                <td>Rare Pink Chest</td>
                <td style="background-color: red;">Precious Pink Chest</td>
            </tr>
            <tr>
                <td>Bread</td>
                <td>Fresh Bread</td>
                <td>Croissant</td>
                <td>Bread Basket</td>
            </tr>
        </table>
    </div>
</template>

<script setup>

</script>

<style scoped>
table, th, tr, td {
    text-align: center;
    font-size: 0.9em;
    border: 1px solid black;
}

.tableContainer {
    width: 90%;
    margin-left: 0px;
    overflow: auto;
}

table {
    th.stringNameCol{
        min-width: 75px;
    }

    tr.tableLevels th {
        min-width: 45px;
    }
}

</style>