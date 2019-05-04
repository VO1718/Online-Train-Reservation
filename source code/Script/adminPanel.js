
//load users
function LoadUserTable() {
    //$.fn.dataTable.moment('M/D/YYYY h:mm:ss A');
    table = $('#tblUsers').DataTable({
        "ajax": {
            "type": "GET",
            "url": "../Controller/BIZ/logic.php",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            data: { "userList": "test"},
            "beforeSend": function (request) {
                //$('#loader').show();
            },
            "dataSrc": function (json) {
                $('#loader').hide();
                var result = (JSON.stringify(json));
                console.log(result);
                return JSON.parse(result);
            },
            "fnDrawCallback": function (oSettings) {
                $('#loader').hide();
            },
        },
        "fixedHeader": {
            "header": true
        },
        "scrollY": "500px",
        "scrollCollapse": true,
        "deferRender": true,
        pageLength: 10,
        "order": [[0, "asc"]],
        columns: [
            { 'data': 'UserID'},
            { 'data': 'FirstName' },
            { 'data': 'LastName' },
            { 'data': 'Email' },
            { 'data': 'Role' },
            { 'data': 'Gender' },
            { 'data': 'Locked' },
            { 'data': 'Active' },
            { 'data': null, 'render': function (data, type, row) {
                    return '<button type= "button" class="btn btn-info btn-header" style="font-size: .5vw;" onclick="viewUser(' + data.UserID + ');"><i class="fas fa-eye" aria-hidden="true"></i> View</button>'
                }
            },
            { 'data': null, 'render': function (data, type, row) {
                    return '<button type= "button" class="btn btn-danger btn-header" style="font-size: .5vw;" onclick="viewUser(' + data.UserID + ');"><i class="fas fa-user-times" aria-hidden="true"></i> Remove</button>'
                }
            }
        ],

        dom: 'lrtip',
        initComplete: function () {
            $('#tblUsers').DataTable().columns.adjust();
        }
    });
}

//load trains
function LoadTrainTable() {
    //$.fn.dataTable.moment('M/D/YYYY h:mm:ss A');
    table = $('#tblTrains').DataTable({
        "ajax": {
            "type": "GET",
            "url": "../Controller/BIZ/logic.php",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            data: { "trainListForAdminPanel": "test"},
            "beforeSend": function (request) {
                //$('#loader').show();
            },
            "dataSrc": function (json) {
                $('#loader').hide();
                var result = (JSON.stringify(json));
                //console.log(result);
                return JSON.parse(result);
            },
            "fnDrawCallback": function (oSettings) {
                $('#loader').hide();
            },
        },
        "fixedHeader": {
            "header": true
        },
        "scrollY": "500px",
        "scrollCollapse": true,
        "deferRender": true,
        pageLength: 10,
        "order": [[0, "asc"]],
        columns: [
            { 'data': 'TrainID'},
            { 'data': 'TrainCode' },
            { 'data': 'TrainName' },
            { 'data': 'NoOfSeats' },
            { 'data': 'IsRegularRun' },
            { 'data': 'isActive' },
            { 'data': null, 'render': function (data, type, row) {
                    return '<button type= "button" class="btn btn-info btn-header" style="font-size: .5vw;" onclick="viewUser(' + data.TrainID + ');"><i class="fas fa-eye" aria-hidden="true"></i> Edit</button>'
                }
            },
            { 'data': null, 'render': function (data, type, row) {
                    return '<button type= "button" class="btn btn-danger btn-header" style="font-size: .5vw;" onclick="viewUser(' + data.TrainID + ');"><i class="fas fa-trash-alt" aria-hidden="true"></i> Remove</button>'
                }
            }
        ],

        dom: 'lrtip',
        initComplete: function () {
            $('#tblTrains').DataTable().columns.adjust();
        }
    });
}


function viewUser(userID) {

    var userObj = {
        userName : userID,
        UserID : userID
    }

    displayEditUserWindow(userObj);

}

function checkValiedEmailAddrss(emailAddress) {
    var email = emailAddress;

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var valid = regex.test(email);

    if(valid){
        return true;
    }else {

        return  false;
    }
}


function displayEditUserWindow(userObj) {
    $.confirm({
        theme: 'modern',
        columnClass: 'large',
        title: 'Modify user ('+ userObj.userName +')',
        content: '' +
            '<div class="row">'+
            '<div class="col-md-6">'+
            '<div class="form-group">' +
            '<label class="float-left">First name</label>' +
            '<input type="text" placeholder="First name" class="name form-control" id="txtUserFirstName" required />' +
            '<span class="text-danger req-field">please fill out this field</span>'+
            '</div>'+
            '<div class="form-group">' +
            '<label class="float-left">Role</label>' +
            '<select class="browser-default custom-select role" id="ddlRole">'+
            '<option selected>Select role</option>'+
            '</select>'+
            '<span class="text-danger req-field">please fill out this field</span>'+
            '</div>'+
            '<div class="form-group">' +
            '<label class="float-left">Gender</label></br>' +
            '<div class="row mt-3 ml-3">'+
            '<div class="custom-control custom-radio">'+
            '<input type="radio" class="custom-control-input rdoMale" id="rdoMale" name="groupOfDefaultRadios">'+
            '<label class="custom-control-label" for="defaultGroupExample1">Male</label>'+
            '</div>'+
            '<div class="custom-control custom-radio ml-3">\n' +
            '  <input type="radio" class="custom-control-input" id="rdoFemale" name="groupOfDefaultRadios" checked>' +
            '  <label class="custom-control-label" for="defaultGroupExample2">Female</label>' +
            '</div>'+
            '</div>'+
            '<div class="form-group mt-4">' +
            '<label class="float-left">Contact</label>' +
            '<input type="text" placeholder="Contact Number" class="form-control contact" id="txtUserConact" required />' +
            '<span class="text-danger req-field">please fill out this field</span>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="col-md-6">'+
            '<div class="form-group">' +
            '<label class="float-left">Last name</label>' +
            '<input type="text" placeholder="Last name" class="form-control lastName" id="txtUserLastName" required />' +
            '<span class="text-danger req-field">please fill out this field</span>'+
            '</div>'+
            '<div class="form-group">' +
            '<label class="float-left">Email</label>' +
            '<input type="email" placeholder="Email" class="form-control" id="txtUserEmail" required disabled/>' +
            '<span class="text-danger req-field">please enter valid email address.</span>'+
            '</div>'+
            '<div class="form-group">' +
            '<label class="float-left">Date of Birth</label>' +
            '<input type="text" placeholder="Date Of Birth" class="form-control dob" id="txtUserDOB" required />' +
            '<span class="text-danger req-field">please fill out this field</span>'+
            '</div>'+
            '<div class="form-group">' +
            '<label class="float-left">Active</label>' +
            '<select class="browser-default custom-select active-T" id="ddlActive">'+
            '<option value="1" selected>Yes</option>'+
            '<option value="0">No</option>'+
            '</select>'+
            '</div>'+
            '</div>'+
            '</div>',
        buttons: {
            Save: {
                text: 'Save',
                btnClass: 'btn-blue',
                action: function () {
                    var firstname = this.$content.find('.name').val();
                    var lastname = this.$content.find('.lastName').val();
                    var role = this.$content.find('.role').val();
                    var gender;

                    if(this.$content.find('.rdoMale').prop('checked'))
                        gender = '1'; //male ID
                    else
                        gender = '2'; //female ID

                    var DOB = this.$content.find('.dob').val();
                    var contact = this.$content.find('.contact').val();
                    var active = this.$content.find('.active-T').val();

                    var errorCount = 0;

                    if(firstname.length <= 0){
                        errorCount++;
                        this.$content.find('.name').siblings('.req-field').show();
                    }else {
                        this.$content.find('.name').siblings('.req-field').hide();
                    }

                    if(lastname.length <= 0){
                        errorCount++;
                        this.$content.find('.lastName').siblings('.req-field').show();
                    }else {
                        this.$content.find('.lastName').siblings('.req-field').hide();
                    }

                    if(DOB.length <= 0){
                        errorCount++;
                        this.$content.find('.dob').siblings('.req-field').show();
                    }else {
                        this.$content.find('.dob').siblings('.req-field').hide();
                    }

                    if(contact.length <= 0){
                        errorCount++;
                        this.$content.find('.contact').siblings('.req-field').show();
                    }else {
                        this.$content.find('.contact').siblings('.req-field').hide();
                    }

                    if(errorCount > 0){
                        return false;
                    }

                    var userDataObject = {
                        UserID : userObj.UserID,
                        FirstName : firstname,
                        LastName : lastname,
                        Role : role,
                        Gender : gender,
                        DOB : DOB,
                        Phone : contact,
                        isActive : active
                    };

                    //updateing
                    $.ajax({
                        url: '../Controller/BIZ/logic.php',
                        type: 'post',
                        data: { "updateUserByAdmin": JSON.stringify(userDataObject)},
                        beforeSend: function(){

                        },
                        complete: function(){

                        },
                        success: function(response) {
                            if(response == 'true'){
                                toastr.success('user updated successfully.', 'successfully');
                                return true;
                            }
                            else{
                                toastr.error('Something went wrong.please try again', 'Error');
                                return  false;
                            }
                        }
                    });


                }
            },
            cancel: function () {
                //close
            },
        },
        contentLoaded: function(data, status, xhr){
            $('#loader').show();
        },
        onContentReady: function () {
            // bind to events
            $('#loader').hide();

            //hide all warning messages
            $('.req-field').each(function() {
                $(this).hide();
            });

            //date picker
            $('#txtUserDOB').datepicker({
                format: 'yyyy-mm-dd',
                showButtonPanel: true,
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                minDate: new Date(1940, 10 - 1, 25),
                endDate: '0',
                yearRange: '1940:c',
                inline: true
            });

            //loadRoles

            $.ajax({
                url: '../Controller/BIZ/logic.php',
                type: 'get',
                data: { "getRoles": sessionStorage.getItem("RoleID")},
                success: function(response) {
                    //var result = (JSON.stringify(response));
                    //console.log(response);
                    $.each(JSON.parse(response), function (i, p) {
                        $('#ddlRole').append($('<option></option>').val(p.RoleID).html(p.Description));
                    });
                }
            });


            //load user data
            $.ajax({
                url: '../Controller/BIZ/logic.php',
                type: 'get',
                data: { "getUserByID": userObj.UserID},
                success: function(response) {
                    var userObj = $.parseJSON(response);
                    $('#txtUserFirstName').val(userObj["FirstName"]);
                    $('#txtUserLastName').val(userObj["LastName"]);
                    $('#txtUserLastName').val(userObj["LastName"]);
                    $('#ddlRole').val(userObj["FK_RoleID"]);
                    $('#txtUserEmail').val(userObj["Email"]);
                    $('#txtUserDOB').val(userObj["DOB"]);
                    $('#txtUserConact').val(userObj["ContactNo"]);
                    $('#ddlActive').val(userObj["isActive"]);

                    if(userObj["FK_GenderID"] == '1'){
                        $('#rdoMale').prop('checked', true);
                    }else{
                        $('#rdoFemale').prop('checked', true);
                    }

                }
            });


        }
    });
}

//global value for select tab index
var selectedTabIndex = 1;
var previousTab = 1;

function AddNewTrain() {
    $.confirm({
        theme: 'modern',
        columnClass: 'large',
        title: 'Add New Train',
        content: '' +
            '<ul class="nav nav-tabs traniTab" id="myTab" role="tablist">'+
            '<li class="nav-item">'+
            '<a class="nav-link active color-black-T" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"'+
            'aria-selected="true">Train</a>'+
                '</li>'+
                '<li class="nav-item">'+
            '<a class="nav-link color-black-T" id="profile-tab" data-toggle="tab" href="#details" role="tab" aria-controls="profile"'+
            'aria-selected="false">Profile</a>'+
                '</li>'+
                '<li class="nav-item">'+
            '<a class="nav-link color-black-T" id="contact-tab" data-toggle="tab" href="#schedule" role="tab" aria-controls="contact"'+
            'aria-selected="false">Contact</a>'+
                '</li>'+
                '</ul>'+
            '<div class="tab-content " id="myTabContent">'+
                '<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">' +
                    '' +'<div class="row">'+
                        '<div class="col-md-6">'+
                        '<div class="form-group">' +
                        '<label class="float-left">Train name</label>' +
                        '<input type="text" placeholder="Train name" class="name form-control" id="txtTrainName" required />' +
                        '<span class="text-danger req-field">please fill out this field</span>'+
                        '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                        '<div class="form-group">' +
                        '<label class="float-left">Train code</label>' +
                        '<input type="text" placeholder="Train code" class="form-control traincode" id="txtTrainCode" required />' +
                        '<span class="text-danger req-field">please fill out this field</span>'+
                        '</div>'+
                        '</div>'+
                        '<div class="col-md-12">' +
                        '<div class="form-group" id="mcestyle">' +
                        '<label class="float-left">Discription</label>' +
                                '<div class="form-group">'+
                            '<textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3"></textarea>'+
                            '</div>'+
                        '<span class="text-danger req-field">please fill out this field</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
            '   </div>'+
                '<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Food truck fixie'+
                    'locavore, accusamus mcsweeneys marfa nulla single-origin coffee squid. Exercitation +1 labore velit,'+
                    'blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'+
                    'Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum'+
                    'PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS'+
                    'stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</div>'+
                '<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Etsy mixtape'+
                    'wayfarers, ethical wes anderson tofu before they sold out mcsweeneys organic lomo retro fanny pack'+
                    'lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard'+
                    'locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify'+
                    'squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie'+
                    'etsy retro mlkshk vice blog. Scenester cred you probably havent heard of them, vinyl craft beer blog</div>'+
        '</div>',
        buttons: {
            cancel: function () {
                btnClass: 'btn-warning savebtn display-hide-T'
                //close
            },
            Save: {
                text: 'Save',
                btnClass: 'btn-green savebtn display-hide-T',
                action: function () {


                }
            },
            previous: {
                text: 'Previous',
                btnClass: 'btn-yelllow prebtn display-hide-T',
                action: function () {


                }
            },
            Next: {
                text: 'Next',
                btnClass: 'btn-blue nxtbtn',
                action: function () {


                }
            }

        },
        contentLoaded: function(data, status, xhr){
            $('#loader').show();
        },
        onContentReady: function () {
            // bind to events
            $('#loader').hide();

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                //e.target // activated tab
                selectedTabIndex = ( $(e.target).closest('li').index() + 1 );

                // previous tab
                previousTab = ( $(e.relatedTarget).closest('li').index() + 1 );


            });

        }
    });
}