var selectedClientPermissions = [];

function pageLoad() {
    var ingredientes = document.getElementById("<%= ingredientes.ClientID %>");

    for (var i = 0; i < ingredientes.length; i++) {
        selectedClientPermissions[i] = ingredientes.options[i].selected;
    }
}

function ListBoxClient_SelectionChanged(sender, args) {
    var scrollPosition = sender.scrollTop;

    for (var i = 0; i < sender.length; i++) {
        if (sender.options[i].selected) selectedClientPermissions[i] = !selectedClientPermissions[i];

        sender.options[i].selected = selectedClientPermissions[i] === true;
    }

    sender.scrollTop = scrollPosition;
}