$(document).ready(function () {
    // when a 'search categorys' button was clicked
    $(document).on('submit', '#search-category-form', function () {
        // get search keywords
        var keywords = $(this).find(":input[name='keywords']").val();

        // get data from the api based on search keywords
        $.getJSON("api/category/search.php?s=" + keywords, function (data) {
            // template in categorys.js
            readCategorysTemplate(data, keywords);
            // chage page title
            changePageTitle("Search Categorys: " + keywords);
        });

        // prevent whole page reload
        return false;
    });

});