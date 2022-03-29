var DWObject = null;

function CreateDWT() {
    Dynamsoft.DWT.CreateDWTObjectEx({
        WebTwainId: 'dwtcontrol'
    },
        function (obj) {
            DWObject = obj;
            DWObject.Viewer.bind(document.getElementById('dwtcontrolContainer'));
            DWObject.Viewer.width = "100%";
            DWObject.Viewer.height = "100%";
            DWObject.SetViewMode(2, 2);
            DWObject.Viewer.show();
        },
        function (err) {
            console.log(err);
        }
    );
}

function Scan() {
    if (DWObject) {
        DWObject.SelectSource(function () {
            DWObject.OpenSource();
            DWObject.AcquireImage();
        },
            function () {
                console.log("SelectSource failed!");
            }
        );
    }
}

function LoadImage() {
    if (DWObject) {
        DWObject.LoadImageEx('', 5,
            function () {
                console.log('success');
            },
            function (errCode, error) {
                alert(error);
            }
        );
    }
}

function Save() {
    DWObject.IfShowFileDialog = true;
    // The path is selected in the dialog, therefore we only need the file name
    DWObject.SaveAllAsPDF("Sample.pdf",
        function () {
            console.log('Successful!');
        },
        function (errCode, errString) {
            console.log(errString);
        }
    );
}

function GetBase64OfSelected() {
    return new Promise(function (resolve, reject) {

        var success = function (result, indices, type) {
            resolve(result.getData(0, result.getLength()));
        };

        var error = function (errorCode, errorString) {
            reject("error");
        };

        DWObject.ConvertToBase64(
            [DWObject.CurrentImageIndexInBuffer],
            Dynamsoft.DWT.EnumDWT_ImageType.IT_JPG,
            success,
            error
        );
    })
}