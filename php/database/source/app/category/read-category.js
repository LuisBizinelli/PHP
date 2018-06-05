$(document).ready(function () {
    // show list of category on first load
    showCategorys("api/category/read_paging.php");

    // when a 'read categorys' button was clicked
    $(document).on('click', '.read-categorys-button', function () {
        showCategorys("api/category/read_paging.php");
    });

    // when a 'page' button was clicked
    $(document).on('click', '.pagination li', function () {
        // get json url
        var json_url = $(this).find('a').attr('data-page');
        // show list of categorys
        showCategorys(json_url);
    });
});

// function to show list of categorys
function showCategorys(json_url) {
    if (!json_url) return;
    // get list of categorys from the API
    $.getJSON(json_url, function (data) {

        // html for listing categorys
        readCategoryTemplate(data, "");

        // chage page title
        changePageTitle("Read Categories");

    });
}