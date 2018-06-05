// category list html
function readCategoryTemplate(data, keywords) {

    var read_category_html = "";

    // search category form
    read_category_html += "<form id='search-category-form' action='#' method='post'>";
    read_category_html += "<div class='input-group pull-left w-30-pct'>";

    read_category_html += "<input type='text' value=\"" + keywords + "\" name='keywords' class='form-control category-search-keywords' placeholder='Search category...' />";

    read_category_html += "<span class='input-group-btn'>";
    read_category_html += "<button type='submit' class='btn btn-default' type='button'>";
    read_category_html += "<span class='glyphicon glyphicon-search'></span>";
    read_category_html += "</button>";
    read_category_html += "</span>";

    read_category_html += "</div>";
    read_category_html += "</form>";

    // when clicked, it will load the create category form
    read_category_html += "<div id='create-category' class='btn btn-primary pull-right m-b-15px create-category-button'>";
    read_category_html += "<span class='glyphicon glyphicon-plus'></span> Create category";
    read_category_html += "</div>";

    // start table
    read_category_html += "<table class='table table-bordered table-hover'>";

    // creating our table heading
    read_category_html += "<tr>";
    read_category_html += "<th class='w-25-pct'>Name</th>";
    read_category_html += "<th class='w-10-pct'>Id</th>";
    read_category_html += "<th class='w-15-pct'>Category</th>";
    read_category_html += "<th class='w-25-pct text-align-center'>Action</th>";
    read_category_html += "</tr>";

    // loop through returned list of data
    $.each(data.records, function (key, val) {

        // creating new table row per record
        read_category_html += "<tr>";

        read_category_html += "<td>" + val.name + "</td>";
        read_category_html += "<td>$" + val.id + "</td>";
        read_category_html += "<td>" + val.category_name + "</td>";

        // 'action' buttons
        read_category_html += "<td>";
        // read category button
        read_category_html += "<button class='btn btn-primary m-r-10px read-one-category-button' data-id='" + val.id + "'>";
        read_category_html += "<span class='glyphicon glyphicon-eye-open'></span> Read";
        read_category_html += "</button>";

        // edit button
        read_category_html += "<button class='btn btn-info m-r-10px update-category-button' data-id='" + val.id + "'>";
        read_category_html += "<span class='glyphicon glyphicon-edit'></span> Edit";
        read_category_html += "</button>";

        // delete button
        read_category_html += "<button class='btn btn-danger delete-category-button' data-id='" + val.id + "'>";
        read_category_html += "<span class='glyphicon glyphicon-remove'></span> Delete";
        read_category_html += "</button>";
        read_category_html += "</td>";

        read_category_html += "</tr>";

    });

    // end table
    read_category_html += "</table>";

    // pagination
    if (data.paging) {
        read_category_html += "<ul class='pagination pull-left margin-zero padding-bottom-2em'>";

        // first page
        if (data.paging.first != "") {
            read_category_html += "<li><a data-page='" + data.paging.first + "'>First Page</a></li>";
        }

        // loop through pages
        $.each(data.paging.pages, function (key, val) {
            var active_page = val.current_page == "yes" ? "class='active'" : "";
            read_category_html += "<li " + active_page + "><a data-page='" + val.url + "'>" + val.page + "</a></li>";
        });

        // last page
        if (data.paging.last != "") {
            read_category_html += "<li><a data-page='" + data.paging.last + "'>Last Page</a></li>";
        }
        read_category_html += "</ul>";
    }

    // inject to 'page-content' of our app
    $("#page-content").html(read_category_html);
}