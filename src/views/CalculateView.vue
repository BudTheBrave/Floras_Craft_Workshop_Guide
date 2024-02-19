<template>
    <h2>Enter what you want to find and the amount</h2>
    <div class="selectionWrapper">
        <dropDown
            :options="dropDownConfig"
            placeholder="Choose item"
            v-model="targetItem"
            :search="true"
        /> 
        <input 
            type="number"
            placeholder="Amount (default 1)"
            v-model="targetAmount"
        />
    </div>
    <div>
        <div v-if="targetItemNotSelectedToggle">
            <p style="padding: 0; margin: 2px">{{ errorMsg }}</p>
        </div>
        <button style="margin-bottom: 5px;" @click="addItems()">Add Items</button>
    </div>
    <div v-if="targetList">
        <div v-for="(obj, objIndex) in targetList" :key="obj.item">
            <div style="display: flex; margin: 3px 3px 8px 3px;">
                <p style="margin: 0;">{{ obj.item }} {{ obj.amount }} </p>
                <button @click="removeIndex(objIndex)" style="margin-left: 10px; width: 20px; height: 20px; border-radius: 7px;">X</button>
            </div>
        </div>
    </div>
    <button @click="getResults()">Get Results</button>
    <div v-if="confirmedList.length != 0">
        <hr/>
        <p style="font-weight: bold; padding: 0; margin: 0;">Input:</p>
        <div v-for="obj in confirmedList" :key="obj.item">{{ obj.item }} {{ obj.amount }}</div>
        <hr/>
        <p v-if="!rawToggle" style="font-weight: bold; padding: 0; margin: 0;">Output:</p>
        <p v-if="rawToggle" style="font-weight: bold; padding: 0; margin: 0;">Output Raw:</p>
        <div v-if="totalGrain">{{ totalGrain }} Grains</div>
        <div v-if="totalClay">{{ totalClay }} Clays</div>
        <div v-if="totalLeatherCollar">{{ totalLeatherCollar }} Leather Collars</div>
        <div v-if="totalSewingNeedle">{{ totalSewingNeedle }}  Sewing Needles</div>
        <div v-if="totalBiscuit">{{ totalBiscuit }} Biscuits</div>
        <div v-if="totalPizzaCrust">{{ totalPizzaCrust }} Pizza Crusts</div>
        <div v-if="totalSeedling">{{ totalSeedling }} Seedlings</div>
        <div v-if="totalRose && (rawToggle == false)">{{ totalRose }} Roses</div>
        <div v-if="totalRoseFrame && (rawToggle == false)">{{ totalRoseFrame }} Rose Frames</div>
        <div v-if="totalWood">{{ totalWood }} Wood</div>
        <div v-if="totalFishBoneToy">{{ totalFishBoneToy }} Fish Bone Toys</div>
        <div v-if="totalMetalFlakes && (rawToggle == false)">{{ totalMetalFlakes }} Metal Flakes</div>
        <div v-if="totalCloth">{{ totalCloth }} Clothes</div>
        <div v-if="totalWhiteTShirt">{{ totalWhiteTShirt }} White-T Shirts</div>
        <div v-if="totalWorkshopOrangeChest">{{ totalWorkshopOrangeChest }} Workshop Orange Chests</div>
        <div v-if="totalWorkshopPinkChest">{{ totalWorkshopPinkChest }} Workshop Pink Chests</div>
        <div v-if="totalFreshBread">{{ totalFreshBread }} Fresh Bread</div>
        <button v-if="!rawToggle" @click="switchToRaw()">Switch to Raw</button>
        <button v-if="rawToggle" @click="switchToRaw()">Switch to Basic</button>
        <button @click="toRawDefToggle = !toRawDefToggle" style="font-size: 0.75em; margin-left: 5px;">hide/show def</button>
        <p v-if="toRawDefToggle" style="padding: 0; margin: 0;">To raw will show output of raw item stright from production. <br>
            Ex: If you are looking for "Sapphire Pendent" it uses "Canned Food" to get the "Metal Flakes".
            To raw take in account for how many "Canned Food" it would take to get enough metal flakes for the pendant. <span style="font-weight: bold;">This is assuming you are tapping 9 times per tappable</span>
        </p>
        <hr>
        <p style="font-weight: bold; padding: 0; margin: 0;">My Buildings:</p>
        <div class="myBuildingClass">
            <dropDown
                :options="bakingConfig"
                placeholder="highest baking"
                v-model="bakingBuilding"
                class="dropDown"
            />
            <dropDown
                :options="fieldsConfig"
                placeholder="highest fields"
                v-model="fieldsBuilding"
                class="dropDown"
            />
        </div>
        <div class="myBuildingClass">    
            <dropDown
                :options="catBedsConfig"
                placeholder="highest cat beds"
                v-model="catBedsBuilding"
                class="dropDown"
            />
            <dropDown
                :options="sewingConfig"
                placeholder="highest sewing"
                v-model="sewingBuilding"
                class="dropDown"
            />
        </div>
        <button style="margin-top: 10px;"  @click="calculateBreadUsage()">Calculate estimated bread usage</button>
        <p v-if="breadToggle != 0">~{{ estimatedBreadCost }} bread || {{ estimatedBreadTime }}</p>
        <p> Time does not include items gotten from glove or ice cube</p>
        <hr>
        <button @click="clearItems()">Clear</button>
    </div>
    
</template>

<script setup>
import dropDown from '@/components/icons/dropDown.vue';
import { ref, watch } from 'vue'

const toRawDefToggle = ref(false);
const targetItemNotSelectedToggle = ref(false);
const errorMsg = ref("")
const targetItem = ref("");
const targetAmount = ref();
const targetList = ref([]);
const confirmedList = ref([]);
const rawToggle = ref(false);

const totalGrain = ref(0);
const totalClay = ref(0);
const totalLeatherCollar = ref(0);
const totalSewingNeedle = ref(0);
const totalBiscuit = ref(0)
const totalPizzaCrust = ref(0)
const totalSeedling = ref(0)
const totalRose = ref(0)
const totalRoseFrame = ref(0)
const totalWood = ref(0)
const totalFishBoneToy = ref(0)
const totalMetalFlakes = ref(0)
const totalCloth = ref(0)
const totalWhiteTShirt = ref(0)
const totalWorkshopOrangeChest = ref(0);
const totalWorkshopPinkChest = ref(0);
const totalFreshBread = ref(0);


// my buildings vars

const bakingBuilding = ref("Premium Oven");
const fieldsBuilding = ref("Flowering Field");
const catBedsBuilding = ref("Catland");
const sewingBuilding = ref("Mini Sewing Machine");

const estimatedBreadCost = ref(0);
const estimatedBreadTime = ref("")
const breadToggle = ref(false)


const dropDownConfig = [
    "Biscuit",
    "Sandwich Biscuits",
    "Sandwich Biscuit Selection",
    "Macaroon",
    "Cheesecake",
    "Cream Cake",
    "Fruit Cake",
    "Tiramisu",
    "Celebration Cake",
    "Limited Mousse Cake",
    "Pizza Crust",
    "Tasting Pizza",
    "Regular Pizza",
    "Ham Pizza",
    "Delux Fruit Pizza",
    "Seedling",
    "Thirving Seedling",
    "Growing Buds",
    "Budding Flower",
    "Blooming Flowers",
    "Rose",
    "Rose Gift Box",
    "Rose Bouquet",
    "Equisite Rose Bouquet",
    "Selected Rose Basket",
    "Rose Frame",
    "Rose Wreath",
    "Rose Bench",
    "Rose Swing",
    "Rose Arch",
    "Wood",
    "Simple Photo Frame",
    "Souvenir Photo Frame",
    "Exuisite Photo Frame",
    "Fish Bone Toy",
    "Fish Pillow",
    "Cat Treats",
    "Canned Fish",
    "Cat-Shaped Jelly",
    "Pet Milk",
    "Premium Cat Food",
    "Salmon",
    "Premium Sea Shrimp",
    "Pet Snack Platter",
    "Metal Flakes",
    "Pearl Earrings",
    "Diamond Ring",
    "Flower Bracelet",
    "Sapphire Pendant",
    "Swan Brooch",
    "Cloth",
    "Cloth in Bulk",
    "White Veil",
    "Patterned Stockings",
    "Luxury Glove",
    "Flower Beret",
    "Butterfly Blouse",
    "Pleated Skirt",
    "Suspender Dress",
    "Puffy Princess dress",
    "Splendid Gown",
    "Pink Lolita",
    "White T-Shirt",
    "Beach Short",
    "Plaid Shirt",
    "Baseball Jacket",
    "Black Leather Jacket",
    "Custom Suit",
    "Vintage Tailcoat",
    "Ceremony Tuxedo"
]
const bakingConfig = [
    "Fermented Dough",
    "Sliced Bread",
    "Bread Basket",
    "Premium Oven"
]
const fieldsConfig = [
    "Fenced Field",
    "Planting Field",
    "Seeding Field",
    "Flowering Field"
]
const catBedsConfig = [
    "Cat Scratcher",
    "Warm Cat Bed",
    "Cat Cushion",
    "Cute Cat Cushion",
    "Catland"
]
const sewingConfig = [
    "Sewing Thread Basket",
    "Mini Sewing Machine",
    "Manual Sewing Machine",
    "Automatic Sewing Machine"
]

// number in average per bread
const productionBuildingPercentages = {
    "Fermented Dough": {
        "Biscuit": 0.8 ,
        "Pizza Crust": 0.2
    },
    "Sliced Bread": {
        "Biscuit": 0.9 ,
        "Pizza Crust": 0.2
    },
    "Bread Basket": {
        "Biscuit": 1.2 ,
        "Pizza Crust": 0.2
    },
    "Premium Oven": {
        "Biscuit": 1.6 ,
        "Pizza Crust": 0.2
    },

    "Fenced Field": {
        "Seedling": 1
    },
    "Planting Field": {
        "Seedling": 1.1
    },
    "Seeding Field": {
        "Seedling": 1.3
    },
    "Flowering Field": {
        "Seedling": 1.5
    },

    "Cat Scratcher": {
        "Fish Bone Toy": .95,
        "Wood": 0.05
    },
    "Warm Cat Bed": {
        "Fish Bone Toy": 1.05,
        "Wood": 0.05
    },
    "Cat Cushion": {
        "Fish Bone Toy": 1.25,
        "Wood": 0.05
    },
    "Cute Cat Cushion": {
        "Fish Bone Toy": 1.45,
        "Wood": 0.05
    },
    "Catland": {
        "Fish Bone Toy": 1.85,
        "Wood": 0.05
    },

    "Sewing Thread Basket": {
        "Cloth": 0.7,
        "White T-Shirt": 0.3
    },
    "Mini Sewing Machine": {
        "Cloth": 0.8,
        "White T-Shirt": 0.3
    },
    "Manual Sewing Machine": {
        "Cloth": 0.4,
        "White T-Shirt": 1.2
    },
    "Automatic Sewing Machine": {
        "Cloth": 0.45,
        "White T-Shirt": 1.5
    }
}

function addItems() {
    if(!targetItem.value){
        //error no item selected
        return;
    }

    // check if already in list
    const isInList = targetList.value.find((obj) => targetItem.value == obj.item)
    if(!isInList) {
        targetList.value.push({
            item: targetItem.value,
            amount: Number(targetAmount.value) || 1
        })
        targetItem.value = null;
        targetAmount.value = null;
    }
   
}

function removeIndex(index) {
    targetList.value.splice(index, 1);
}

function getResults() {
    if(targetList.value.length == 0) {
        //error nothing to search
        alert("nothing to compute")
        return
    } 
    
    targetList.value.forEach(obj => {
        getRecursiveConversion(obj.item, obj.amount)

    });


    confirmedList.value.push(...targetList.value);
    targetList.value = [];
}


function switchToRaw(){
    if(breadToggle.value){
        return
    }

    rawToggle.value = !rawToggle.value
    estimatedBreadCost.value = 0;
    // canned fish -> metal flakes
    // blooming flowers -> rose
    // selected rose basket -> rose frame
    if(rawToggle.value){
        let loopTimes = 0;
        if(totalRoseFrame.value > 0){
            loopTimes = Math.ceil(totalRoseFrame.value / 9)
            estimatedBreadCost.value += 9*loopTimes;
            getRecursiveConversion("Selected Rose Basket", loopTimes);
        }
        if(totalRose.value > 0){
            loopTimes = Math.ceil(totalRose.value / 9)
            estimatedBreadCost.value += 9*loopTimes;
            getRecursiveConversion("Blooming Flowers", loopTimes);
        }
        if(totalMetalFlakes.value > 0){
            loopTimes = Math.ceil(totalMetalFlakes.value / 9)
            estimatedBreadCost.value += 9*loopTimes;
            getRecursiveConversion("Canned Fish", loopTimes);
        }
    } else {
        totalGrain.value = 0
        totalClay.value = 0
        totalLeatherCollar.value = 0
        totalSewingNeedle.value = 0
        totalBiscuit.value = 0
        totalPizzaCrust.value = 0
        totalSeedling.value = 0
        totalRose.value = 0
        totalRoseFrame.value = 0
        totalWood.value = 0
        totalFishBoneToy.value = 0
        totalMetalFlakes.value = 0
        totalCloth.value = 0
        totalWhiteTShirt.value = 0
        totalWorkshopOrangeChest.value = 0
        totalWorkshopPinkChest.value = 0
        totalFreshBread.value = 0

        targetList.value = confirmedList.value
        confirmedList.value = [];
        getResults()
    }
}

function clearItems() {
    totalGrain.value = 0
    totalClay.value = 0
    totalLeatherCollar.value = 0
    totalSewingNeedle.value = 0
    totalBiscuit.value = 0
    totalPizzaCrust.value = 0
    totalSeedling.value = 0
    totalRose.value = 0
    totalRoseFrame.value = 0
    totalWood.value = 0
    totalFishBoneToy.value = 0
    totalMetalFlakes.value = 0
    totalCloth.value = 0
    totalWhiteTShirt.value = 0
    totalWorkshopOrangeChest.value = 0
    totalWorkshopPinkChest.value = 0
    totalFreshBread.value = 0
    targetItemNotSelectedToggle.value = false;
    errorMsg.value = "";
    targetItem.value = "";
    targetAmount.value = null;
    targetList.value = [];
    confirmedList.value = [];
    rawToggle.value = false;
    bakingBuilding.value = ""
    fieldsBuilding.value = ""
    catBedsBuilding.value = ""
    sewingBuilding.value = ""
    estimatedBreadCost.value = 0
    breadToggle.value = false
}

function calculateBreadUsage() {
    if(!bakingBuilding.value || !fieldsBuilding.value || !catBedsBuilding.value || !sewingBuilding.value) {
        alert("please select youre current production levels")
        return;
    } 
    const averages = {}

    if(rawToggle.value == false){
        rawToggle.value == true;
        switchToRaw();
    }

    for(const building in productionBuildingPercentages){
        if(building == bakingBuilding.value
        || building == fieldsBuilding.value
        || building == catBedsBuilding.value
        || building == sewingBuilding.value){
            Object.assign(averages, productionBuildingPercentages[building])
        }
    }

    breadToggle.value = true

    console.log(estimatedBreadCost.value, "est")

    estimatedBreadCost.value = 0;
    estimatedBreadCost.value += Math.ceil(totalBiscuit.value / averages['Biscuit'])
    estimatedBreadCost.value += Math.ceil(totalPizzaCrust.value / averages['Pizza Crust'])
    estimatedBreadCost.value += Math.ceil(totalSeedling.value / averages['Seedling'])
    estimatedBreadCost.value += Math.ceil(totalWood.value / averages['Wood'])
    estimatedBreadCost.value += Math.ceil(totalFishBoneToy.value / averages['Fish Bone Toy'])
    estimatedBreadCost.value += Math.ceil(totalCloth.value / averages['Cloth'])
    estimatedBreadCost.value += Math.ceil(totalWhiteTShirt.value / averages['White T-Shirt'])
    
    let totalTimeM = estimatedBreadCost.value * 2;
    if((totalTimeM / 60) >= 1){
        if((totalTimeM / (60*24)) >= 1){
            estimatedBreadTime.value = `${Math.floor(totalTimeM / (60*24)) % 365}D `;
        }
        estimatedBreadTime.value += `${Math.floor(totalTimeM / 60) % 24}H `;
    }
    estimatedBreadTime.value += `${totalTimeM % 60}M`

}

watch(targetItem, (newValue) => {
        if(targetList.value.find(obj => obj.item == newValue)){
            errorMsg.value = "Warning: Item Already in list"
            targetItemNotSelectedToggle.value = true
        } else if(!newValue) {
            errorMsg.value = "Warning: No item selected"
            targetItemNotSelectedToggle.value = true
        } else {
            targetItemNotSelectedToggle.value = false
        }
});



//recursive
function getRecursiveConversion(item, amount){
    for(let i = 0; i < amount; i++) {
        switch (item) {
            case "Grain":
                totalGrain.value += 1;
                break;
            case "Flour":
                getRecursiveConversion("Grain", 2)
                break;
            case "Fine Flour":
                getRecursiveConversion("Flour", 2)
                break;
            case "Dough":
                getRecursiveConversion("Fine Flour", 2)
                break;    
            case "Fermented Dough":
                getRecursiveConversion("Dough", 2)
                break;
            case "Sliced Bread":
                getRecursiveConversion("Fermented Dough", 2)
                break;
            case "Bread Basket":
                getRecursiveConversion("Sliced Bread", 2)
                break;
            case "Premium Oven":
                getRecursiveConversion("Bread Basket", 2)
                break;
            case "Clay":
                totalClay.value += 1;
                break;
            case "Fertile Clay":
                getRecursiveConversion("Clay", 2)
                break;
            case "Field":
                getRecursiveConversion("Fertile Clay", 2)
                break;
            case "Fenced Field":
                getRecursiveConversion("Field", 2)
                break;
            case "Planting Field":
                getRecursiveConversion("Fenced Field", 2)
                break;
            case "Seeding Field":
                getRecursiveConversion("Planting Field", 2)
                break;
            case "Flowering Field":
                getRecursiveConversion("Seeding Field", 2)
                break;
            case "Leather Collar":
                totalLeatherCollar.value += 1;
                break;
            case "Bowknot Collar":
                getRecursiveConversion("Leather Collar", 2)
                break;
            case "Cat Food Bowl":
                getRecursiveConversion("Bowknot Collar", 2)
                break;
            case "Cute Cat Food Bowl":
                getRecursiveConversion("Cat Food Bowl", 2)
                break;
            case "Pet Coat":
                getRecursiveConversion("Cute Cat Food Bowl", 2)
                break;
            case "Cat Scratcher":
                getRecursiveConversion("Pet Coat", 2)
                break;
            case "Warm Cat Bed":
                getRecursiveConversion("Cat Scratcher", 2)
                break;
            case "Cat Cushion":
                getRecursiveConversion("Warm Cat Bed", 2)
                break;
            case "Cute Cat Cushion":
                getRecursiveConversion("Cat Cushion", 2)
                break;
            case "Catland":
                getRecursiveConversion("Cute Cat Cushion", 2)
                break;
            case "Sewing Needle":
                totalSewingNeedle.value += 1;
                break;
            case "Sewing Thread":
                getRecursiveConversion("Sewing Needle", 2)
                break;
            case "Yarn Balls":
                getRecursiveConversion("Sewing Thread", 2)
                break;
            case "Sewing Thread Kit":
                getRecursiveConversion("Yarn Balls", 2)
                break;
            case "Sewing Thread Case":
                getRecursiveConversion("Sewing Thread Kit", 2)
                break;
            case "Double Sewing Thread Case":
                getRecursiveConversion("Sewing Thread Case", 2)
                break;
            case "Sewing Thread Basket":
                getRecursiveConversion("Double Sewing Thread Case", 2)
                break;
            case "Mini Sewing Machine":
                getRecursiveConversion("Sewing Thread Basket", 2)
                break;
            case "Manual Sewing Machine":
                getRecursiveConversion("Mini Sewing Machine", 2)
                break;
            case "Automatic Sewing Machine":
                getRecursiveConversion("Manual Sewing Machine", 2)
                break;
            case "Biscuit":
                totalBiscuit.value += 1;
                break;
            case "Sandwich Biscuits":
                getRecursiveConversion("Biscuit", 2)
                break;
            case "Sandwich Biscuit Selection":
                getRecursiveConversion("Sandwich Biscuits", 2)
                break;
            case "Macaroon":
                getRecursiveConversion("Sandwich Biscuit Selection", 2)
                break;
            case "Cheesecake":
                getRecursiveConversion("Macaroon", 2)
                break;
            case "Cream Cake":
                getRecursiveConversion("Cheesecake", 2)
                break;
            case "Fruit Cake":
                getRecursiveConversion("Cream Cake", 2)
                break;
            case "Tiramisu":
                getRecursiveConversion("Fruit Cake", 2)
                break;
            case "Celebration Cake":
                getRecursiveConversion("Tiramisu", 2)
                break;
            case "Limited Mousse Cake":
                getRecursiveConversion("Celebration Cake", 2)
                break;
            case "Pizza Crust":
                totalPizzaCrust.value += 1;
                break;
            case "Tasting Pizza":
                getRecursiveConversion("Pizza Crust", 2)
                break;
            case "Regular Pizza":
                getRecursiveConversion("Tasting Pizza", 2)
                break;
            case "Ham Pizza":
                getRecursiveConversion("Regular Pizza", 2)
                break;
            case "Delux Fruit Pizza":
                getRecursiveConversion("Ham Pizza", 2)
                break;
            case "Seedling":
                totalSeedling.value += 1;
                break;
            case "Thirving Seedling":
                getRecursiveConversion("Seedling", 2)
                break;
            case "Growing Buds":
                getRecursiveConversion("Thirving Seedling", 2)
                break;
            case "Budding Flower":
                getRecursiveConversion("Growing Buds", 2)
                break;
            case "Blooming Flowers":
                getRecursiveConversion("Budding Flower", 2)
                break;
            case "Rose":
                totalRose.value += 1;
                break;
            case "Rose Gift Box":
                getRecursiveConversion("Rose", 2)
                break;
            case "Rose Bouquet":
                getRecursiveConversion("Rose Gift Box", 2)
                break;
            case "Equisite Rose Bouquet":
                getRecursiveConversion("Rose Bouquet", 2)
                break;
            case "Selected Rose Basket":
                getRecursiveConversion("Equisite Rose Bouquet", 2)
                break;
            case "Rose Frame":
                totalRoseFrame.value += 1;
                break;
            case "Rose Wreath":
                getRecursiveConversion("Rose Frame", 2)
                break;
            case "Rose Bench":
                getRecursiveConversion("Rose Wreath", 2)
                break;
            case "Rose Swing":
                getRecursiveConversion("Rose Bench", 2)
                break;
            case "Rose Arch":
                getRecursiveConversion("Rose Swing", 2)
                break;
            case "Wood":
                totalWood.value += 1;
                break;
            case "Simple Photo Frame":
                getRecursiveConversion("Wood", 2)
                break;
            case "Souvenir Photo Frame":
                getRecursiveConversion("Simple Photo Frame", 2)
                break;
            case "Exuisite Photo Frame":
                getRecursiveConversion("Souvenir Photo Frame", 2)
                break;
            case "Fish Bone Toy":
                totalFishBoneToy.value += 1;
                break;
            case "Fish Pillow":
                getRecursiveConversion("Fish Bone Toy", 2)
                break;
            case "Cat Treats":
                getRecursiveConversion("Fish Pillow", 2)
                break;
            case "Canned Fish":
                getRecursiveConversion("Cat Treats", 2)
                break;
            case "Cat-Shaped Jelly":
                getRecursiveConversion("Canned Fish", 2)
                break;
            case "Pet Milk":
                getRecursiveConversion("Cat-Shaped Jelly", 2)
                break;
            case "Premium Cat Food":
                getRecursiveConversion("Pet Milk", 2)
                break;
            case "Salmon":
                getRecursiveConversion("Premium Cat Food", 2)
                break;
            case "Premium Sea Shrimp":
                getRecursiveConversion("Salmon", 2)
                break;
            case "Pet Snack Platter":
                getRecursiveConversion("Premium Sea Shrimp", 2)
                break;
            case "Metal Flakes":
                totalMetalFlakes.value += 1;
                break;
            case "Pearl Earrings":
                getRecursiveConversion("Metal Flakes", 2)
                break;
            case "Diamond Ring":
                getRecursiveConversion("Pearl Earrings", 2)
                break;
            case "Flower Bracelet":
                getRecursiveConversion("Diamond Ring", 2)
                break;
            case "Sapphire Pendant":
                getRecursiveConversion("Flower Bracelet", 2)
                break;
            case "Swan Brooch":
                getRecursiveConversion("Sapphire Pendant", 2)
                break;
            case "Cloth":
                totalCloth.value += 1;
                break;
            case "Cloth in Bulk":
                getRecursiveConversion("Cloth", 2)
                break;
            case "White Veil":
                getRecursiveConversion("Cloth in Bulk", 2)
                break;
            case "Patterned Stockings":
                getRecursiveConversion("White Veil", 2)
                break;
            case "Luxury Glove":
                getRecursiveConversion("Patterned Stockings", 2)
                break;
            case "Flower Beret":
                getRecursiveConversion("Luxury Glove", 2)
                break;
            case "Butterfly Blouse":
                getRecursiveConversion("Flower Beret", 2)
                break;
            case "Pleated Skirt":
                getRecursiveConversion("Butterfly Blouse", 2)
                break;
            case "Suspender Dress":
                getRecursiveConversion("Pleated Skirt", 2)
                break;
            case "Puffy Princess dress":
                getRecursiveConversion("Suspender Dress", 2)
                break;
            case "Splendid Gown":
                getRecursiveConversion("Puffy Princess dress", 2)
                break;
            case "Pink Lolita":
                getRecursiveConversion("Splendid Gown", 2)
                break;
            case "White T-Shirt":
                totalWhiteTShirt.value += 1;
                break;
            case "Beach Short":
                getRecursiveConversion("White T-Shirt", 2)
                break;
            case "Plaid Shirt":
                getRecursiveConversion("Beach Short", 2)
                break;
            case "Baseball Jacket":
                getRecursiveConversion("Plaid Shirt", 2)
                break;
            case "Black Leather Jacket":
                getRecursiveConversion("Baseball Jacket", 2)
                break;
            case "Custom Suit":
                getRecursiveConversion("Black Leather Jacket", 2)
                break;
            case "Vintage Tailcoat":
                getRecursiveConversion("Custom Suit", 2)
                break;
            case "Ceremony Tuxedo":
                getRecursiveConversion("Vintage Tailcoat", 2)
                break;
            case "Workshop Orange Chest":
                totalWorkshopOrangeChest.value += 1;
                break;
            case "Rare Orange Chest":
                getRecursiveConversion("Workshop Orange Chest", 2)
                break;
            case "Precious Orange Chest":
                getRecursiveConversion("Rare Orange Chest", 2)
                break;
            case "Workshop Pink Chest":
                totalWorkshopPinkChest.value += 1;
                break;
            case "Rare Pink Chest":
                getRecursiveConversion("Workshop Pink Chest", 2)
                break;
            case "Precious Pink Chest":
                getRecursiveConversion("Rare Pink Chest", 2)
                break;
            case "Fresh Bread":
                totalFreshBread.value += 1;
                break;
            case "Croissant":
                getRecursiveConversion("Fresh Bread", 2)
                break;
            case "Bread Basket1":
                getRecursiveConversion("Croissant", 2)
                break;
        }
    }
}


</script>

<style scoped>
.selectionWrapper {
    display: flex;
    flex-direction: row;
}

button {
    padding: 2px;
    border: 1px solid black;
    border-radius: 5px;
}

.myBuildingClass {
    display: flex;
    width: 100%; 
    font-weight: normal;
    
    .dropDown {
        font-weight: normal;;
        max-width: 50%;
    }
}


</style>