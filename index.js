let shopMarkup = 1.45;
let dClassMarkup = 1.0;
let cClassMarkup = 1.3;
let bClassMarkup = 1.5;
let aClassMarkup = 1.95;
let sClassMarkup = 2.5;
let sPlusClassMarkup = 2.75;

var grandTotal = 0;
var grossTotal = 0;
var totalCount = 0;
var vehClass = '';
var vehClassMarkup = 1.0;

let partsList = [
    { "Name": "Battery", "Price": "100" },
    { "Name": "Axle parts", "Price": "150" },
    { "Name": "Oil", "Price": "50" },
    { "Name": "Spark plugs", "Price": "75", },
    { "Name": "Tint", "Price": "300" },
    { "Name": "Cleaning kit", "Price": "50" },
    { "Name": "Spare Tire", "Price": "150" },
    { "Name": "Custom Horn", "Price": "100" },
    { "Name": "Xenon Headlights", "Price": "250" },
    { "Name": "Neons", "Price": "250" },
    { "Name": "Spray", "Price": "50" },
    { "Name": "Spoiler", "Price": "250" },
    { "Name": "Livery", "Price": "450" },
    { "Name": "Roll Cage", "Price": "550" },
    { "Name": "Internal Cosmetics", "Price": "250" },
    { "Name": "Exterior Cosmetics", "Price": "250" },
    { "Name": "Custom Plate", "Price": "350" },
    { "Name": "Bumper", "Price": "150" },
    { "Name": "Roof", "Price": "250" },
    { "Name": "Hood", "Price": "250" },
    { "Name": "Seat", "Price": "250" },
    { "Name": "Tire Smoke", "Price": "150" },
    { "Name": "Skirt", "Price": "250" },
    { "Name": "Exhaust", "Price": "450" },
    { "Name": "Rims", "Price": "550" },
    { "Name": "Tow (In city)", "Price": "150" },
    { "Name": "Tow (Out city)", "Price": "250" },
    { "Name": "Turbo", "Price": "1500" },
    { "Name": "Tier 1 Suspension", "Price": "300" },
    { "Name": "Tier 2 Suspension", "Price": "400" },
    { "Name": "Tier 3 Suspension", "Price": "500" },
    { "Name": "Tier 4 Suspension", "Price": "600" },
    { "Name": "Tier 5 Suspension", "Price": "800" },
    { "Name": "Tier 1 Transmission", "Price": "350" },
    { "Name": "Tier 2 Transmission", "Price": "450" },
    { "Name": "Tier 3 Transmission", "Price": "750" },
    { "Name": "Tier 1 Brakes", "Price": "250" },
    { "Name": "Tier 2 Brakes", "Price": "450" },
    { "Name": "Tier 1 Engine", "Price": "450" },
    { "Name": "Tier 2 Engine", "Price": "750" },
    { "Name": "Tier 3 Engine", "Price": "1150" },
];

$.each(partsList, function(key, val) {
    let results =  $(".main").find("#dropdownResults")
    $('#dropdownResults').append('<a class="addPart text-white block text-xl text-center py-3 hover:bg-gray-500 cursor-pointer rounded-md" data-name="' + val['Name'] +'" data-price="' + val['Price'] +'">' + val['Name'] + '<div class="mr-3 float-right inline-flex float items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">$' + val['Price'] + '</div></a>');
});


function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("partSearch");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownResults");
    div.classList.remove('hidden');
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
    if (input.value < 2) {
      div.classList.add('hidden');
    }
  }
  $('.addPart').on('click', function(params) {
    let part = params.target.dataset;
    let receipt = $('.receipt');
    let resultList = $('#results');
    receipt.removeClass('hidden');
    
    resultList.append('<div class="partSlice flex flex-1 flex-col" data-price="'+ part.price +'"><div><div class="flex justify-between mt-2"><h4 class="text-2xl"><a href="#" class="text-white font-mono hover:text-gray-400">' + part.name + '</a></h4><p class="ml-4 text-xl font-mono text-white partPrice">$' + part.price + '</p></div></div><div class="flex flex-1 items-end justify-between mb-3"><div class="ml-4"></div><div class="ml-4"><button type="button" class="removePartFromOrder text-sm font-medium text-indigo-600 hover:text-indigo-500"><span>Remove</span></button></div></div>');

    $('#partSearch').val('');
    $('#dropdownResults').addClass('hidden');
    $('#partSearch').focus();

    totalCount = parseFloat(totalCount) + parseFloat(part.price) // keeping total of parts

    let receiptTotal = $(document).find('.grand-total');
    let grossTotal = $(document).find('.gross-total');
    grandTotal = parseFloat(grandTotal) + parseFloat(part.price) * shopMarkup * vehClassMarkup;
    grossTotalCost = parseFloat(grandTotal) - parseFloat(totalCount); // total minus part price
    receiptTotal.text(grandTotal.toFixed(2));
    grossTotal.text(grossTotalCost.toFixed(2));
  });

  $('.classSelect').on('change', function(e) {
    let selectedClass = this.value;
    vehClass = this.value;
    let classMarkup = 0;

    switch (selectedClass) {
      case 'D':
        classMarkup = dClassMarkup;
        break;
      case 'C':
        classMarkup = cClassMarkup;
        break;
      case 'B':
        classMarkup = bClassMarkup;
        break;
      case 'A':
        classMarkup = aClassMarkup;
        break;
      case 'S':
        classMarkup = sClassMarkup;
        break;
      case 'S+':
        classMarkup = sPlusClassMarkup;
        break;
    }

    vehClassMarkup = classMarkup;

    let receiptTotal = $(document).find('.grand-total');
    let grossTotalEl = $(document).find('.gross-total');
    grandTotal = parseFloat(totalCount) * shopMarkup * classMarkup;
    grossTotal = parseFloat(grandTotal) - parseFloat(totalCount);
    grossTotalEl.text(grossTotal.toFixed(2));
    receiptTotal.text(grandTotal.toFixed(2));
  });

  $(document).ready(function(){

    $('input[type=search]').on('search', function () {
      // search logic here
      // this function will be executed on click of X (clear button)
      $('#dropdownResults').addClass('hidden');
  });
  
    $(document).on('click', '.removePartFromOrder', function() {
      let resultList = $('#results');
      let receipt = $('.receipt');
      let partSlice = $(this).closest('.partSlice');
      let partPrice = partSlice[0].dataset.price;
      let receiptTotal = $(document).find('.grand-total');
      let grossTotalEl = $(document).find('.gross-total');

      totalCount = parseFloat(totalCount) - parseFloat(partPrice) // total cost of parts used
      console.log(totalCount, grandTotal);

      grandTotal = parseFloat(totalCount) * shopMarkup * vehClassMarkup;
      grossTotal = parseFloat(grandTotal) - parseFloat(totalCount);
      grossTotalEl.text(grossTotal.toFixed(2));

      receiptTotal.text(grandTotal.toFixed(2));
      partSlice.remove();

      if (resultList.children().length == 0) {
        receipt.addClass('hidden')
        grandTotal = 0;
      }
    });

    const date = new Date();

    $(document).find('.date').text(date);
});







  