<template>
    <div class="top-container">
        <h4>Info Page</h4>
        <ul class="infoList">
            <li>Go for house upgrades first
                <div @click="houseTableToggle" style="font-size: 0.75em;" id="houseTableToggleId">{{ houseTableCollisableText }}</div>
                <div v-if="showHouseTable" class="houseTable">
                    <table>
                        <tr>
                            <th class="level">Level</th>
                            <th class="item">Items</th>
                            <th class="coins">Workshop Coin</th>
                        </tr>
                        <tr>
                            <td>1 -> 2</td>
                            <td>Tiramisu <br> 
                                Premium Cat Food
                            </td>
                            <td>246 coins</td>
                        </tr>
                        <tr>
                            <td>2 -> 3</td>
                            <td>Blooming Flowers <br> 
                                Sapphire Pendant
                            </td>
                            <td>369 coins</td>
                        </tr>
                        <tr>
                            <td>3 -> 4</td>
                            <td>Pet Milk <br>
                                Sapphire Pendant <br>
                                Budding Flowers
                            </td>
                            <td>491 coins</td>
                        </tr>
                        <tr>
                            <td>4 -> 5</td>
                            <td>Delux Fruit Pizza<br>
                                Exuisite Photo Frame<br>
                                Baseball Jacket
                            </td>
                            <td>614 coins</td>
                        </tr>
                        <tr>
                            <td>5 -> 6</td>
                            <td>Premium Sea Shrimp<br>
                                Butterfly Blouse
                            </td>
                            <td>2,944 coins</td>
                        </tr>
                        <tr>
                            <td>6 -> 7</td>
                            <td>Black Leather Jacket <br>
                                Selected Rose Basket
                            </td>
                            <td>1,716 coins</td>
                        </tr>
                        <tr>
                            <td>7 -> 8</td>
                            <td>Delux Fruit Pizza <br>
                                Exquisite Photo Frame <br>
                                Sapphire Pendant
                            </td>
                            <td>1,962 coins</td>
                        </tr>
                        <tr>
                            <td>8 -> 9</td>
                            <td>Limited Mousse Cake <br>
                                Premium Sea Shrimp <br>
                                Rose Bench
                            </td>
                            <td>4,412 coins</td>
                        </tr>
                        <tr>
                            <td>9 -> 10</td>
                            <td>Exuisite Photo Frame<br>
                                Custom Suit<br>
                                Blooming Flowers
                            </td>
                            <td>4,904 coins</td>
                        </tr>
                        <tr>
                            <td>10 -> 11</td>
                            <td>Pet Snack Platter<br>
                                Pleated Skirt
                            </td>
                            <td>10,784 coins</td>
                        </tr>
                        <tr>
                            <td>11 -> 12</td>
                            <td>Limited Mousse Cake<br>
                                Exuisite Photo Frame<br>
                                Butterfly Blouse<br>
                                Rose Arch
                            </td>
                            <td>8,820 coins</td>
                        </tr>
                        <tr>
                            <td>12 -> 13</td>
                            <td>Celebration Cake<br>
                                Souvenir Photo Frame<br>
                                Vintage Tailcoat</td>
                            <td>9,558 coins</td>
                        </tr>
                        <tr>
                            <td>13 -> 14</td>
                            <td>Suspender Dress</td>
                            <td>10,290 coins</td>
                        </tr>
                        <tr>
                            <td>14 -> 15</td>
                            <td>Limited Mousse Cake x2<br>
                                Pet Snack Platter<br>
                                Exuisite Photo Frame<br>
                                Pleated Skirt<br>
                                Rose Arch
                            </td>
                            <td>18,380 coins</td>
                        </tr>
                        <tr>
                            <td>15 -> 16</td>
                            <td>Delux Fruit Pizza x5<br>
                                Exuisite Photo Frame x2<br>
                                Puffy Princess dress
                            </td>
                            <td>27,440 coins</td>
                        </tr>
                        <tr>
                            <td>16 -> 17</td>
                            <td>Limited Mousse Cake x3<br>
                                Pet Snack Platter x5<br>
                                Rose Arch x3<br>
                                Vintage Tailcoat
                            </td>
                            <td>41,640 coins</td>
                        </tr>
                        <tr>
                            <td>17 -> 18</td>
                            <td>Splendid Gown<br>
                                Exuisite Photo Frame x3
                            </td>
                            <td>57,330 coins</td>
                        </tr>
                        <tr>
                            <td>18 -> 19</td>
                            <td>Pink Lolita</td>
                            <td>79,118 coins</td>
                        </tr>
                        <tr>
                            <td>19 -> 20</td>
                            <td>Limited Mousse Cake x5<br>
                                Pet Snack Platter x5<br>
                                Ceremony Tuxedo x5
                            </td>
                            <td>98,000 coins</td>
                        </tr>
                        <tr>
                            <td>20 -> 21</td>
                            <td>Pink Lolita<br>
                                Pet Snack Platter x5<br>
                                Exuisite Photo Frame x3<br>
                                Limited Mousse Cake x3<br>
                                Rose Arch
                            </td>
                            <td>134,700 coins</td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>Note there are only 4 primary item strings that have a cooldown. <br> aka: production items<br>
                <ol class="itemStringList">
                    <li>Fermented Dough &rarr; 
                        Sliced Bread &rarr; 
                        Bread Basket &rarr; 
                        Premium Oven <br>
                        <p style="margin:0">10min cooldown</p>
                    </li>
                    <li>Fenced Field &rarr;
                        Planting Field &rarr;
                        Seedling Field &rarr;
                        Flowering Field <br>
                        <p style="margin:0">4hr cooldown</p>
                    </li>
                    <li>Cat Scratcher &rarr;
                        Warm Cat Bed &rarr;
                        Cat Cushion &rarr;
                        Cute Cat Cushion &rarr;
                        Catland <br>
                        <p style="margin:0">1hr cooldown</p>
                    </li>
                    <li>Sewing Thread Basket &rarr;
                        Mini Sewing Machine &rarr;
                        Manual Sewing Machine &rarr;
                        Automatic Sewing Machine <br>
                        <p style="margin:0">6hr cooldown</p>
                    </li>
                </ol>
            </li>
            <li>If other tappables, aka limited production items, appear tap them all 
                but one time. ex: can be tapped 10 times,
                tap 9 then merge. This is because unlike regualr prodection items, these limited production items dissapear if all productions are used.
                <br>
                <b>
                    IMPORTANT: this does NOT apply to the chests
                    you get from the house. tap them so there is 5 remaining then merge
                </b> 
                <br>
                Reason is beacuse the tap number 
                does not reset between merges. 
                EX: you have two lv 1 chests, you tap 
                them both 9 times, leaving 1 remaining on 
                both, apon merging you can told tap the 
                new level 2 chest twice before it disappears.
                the max tap is 5, so if you leave 5 remaing 
                on both the chests the next level will be max of 10
            </li>
            <li>
                For max efficeny, log on every 3 hours.
                bread recovers every 2 minutes with a max of 100.
                so you'll max out after 200 minutes or 3 hours 20 min
            </li>
            <li>
                Visit Equipment:
                    I found using then aquired is most useful, apart from mystical hourglass.
                    use hourglass when needing cooldown of sewing Machine
                    For hourglass mini game rewards goes as follows <br>
                    0-99 points: 5% reduction<br>
                    99-299 points: 10% reduction <br> 
                    300+ points: 20% reduction <br>
                    Note: reduction is for cooldown only you will not get bread out of this
            </li>
        </ul>

    </div>
</template>


<script setup>
import{ ref } from 'vue'
var showHouseTable = ref(false);
var houseTableCollisableText = ref('Expand house upgrade list')

function houseTableToggle() {
    showHouseTable.value = !showHouseTable.value
    houseTableCollisableText.value = (houseTableCollisableText.value == 'Expand house upgrade list') ? "Close house upgrade list" : "Expand house upgrade list";
}

</script>

<style scoped>
.top-container{
    text-align: center;
}

.infoList {
    list-style-position: inside;
    margin: 5px;
    padding: 0;

    li {
        padding: 10px;
    }
}

.itemStringList {
    padding: 0;

    li {
        padding: 5px;
    }
}




.houseTable {
    width: 80%;
    margin-inline: auto;
    font-size: .6em;

    table, th, tr, td {
        border: 1px solid black;
    }  
    
    th, tr, td {
        padding: 3px
    }

    th {
        font-size: 1.25em;
    }

    th.level {
        width: 20%;
    }
    th.item{
        width: 55%;
    }
    th.coins{
        width: 25%;
    }
}
</style>