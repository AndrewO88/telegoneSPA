import '../site/base.css'

/**
 *
 * @param params string[] | location.pathname.split('/')
 * @returns {string}
 */
function buildLink(params) {
    let str = '';
    if (!Array.isArray(params)) {
        return str;
    }

    switch (params[1]) {
        case "socks":
            str = "tg://socks" + location.search;
            break;
        case "joinchat":
            str = "tg://join?invite=" + params[2];
            break;
        case "addstickers":
            str = "tg://addstickers?set=" + params[2];
            break;
        case "proxy":
            str = "tg://" + params[1] + location.search;
            break;
        default:
            const domain = params[1];
            str = "tg://resolve?domain=" + domain + location.search.replace("?start=", "&start=");
            if (params[2]) {
                str += "&post=" + params[2]
            }
    }

    return str;
}

/**
 *
 * @param list NodeList[]
 * @param value string
 */
function setHref(list, value) {
    if (list instanceof NodeList && typeof value === 'string') {
        list.forEach((a) => {
            a.href = value;
            a.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                window.location = value;
            });
        })
    }
}

/**
 *
 * @param list NodeList[]
 * @param value string
 */
function setTitle(list, value) {
    if (list instanceof NodeList && typeof value === 'string') {
        list.forEach((node) => {
            node.innerHTML = value;
        })
    }
}

function initListeners() {
    window.addEventListener('DOMContentLoaded', (event) => {
        const target = event.target;
        if (target instanceof HTMLDocument) {
            const info = target.location.pathname.split("/");

            if (!info[1]) {
                target.location = '/m';
                return;
            }

            const anchors = target.querySelectorAll('a.offer-link');
            const titles = target.querySelectorAll('.offer-title');

            setHref(anchors, buildLink(info));
            setTitle(titles, info[1]);

            const redirector = target.querySelector('.redirector');
            redirector.classList.remove('hidden')
            redirector.classList.add('fadeIn')
        }
    });


}

initListeners();
