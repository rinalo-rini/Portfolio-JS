const tl = gsap.timeline({defaults: {ease: 'power1.out'}})
        tl.to('.text', {y:"0%", duration: 1, stagger: 0.5 });
        tl.to('.slider', {y: "-100%", duration: 2 });
        tl.to('.intro', {y: "-100%", duration: 1}, "-=2");

document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.querySelector(".items");
    const itemsCols = document.querySelectorAll(".items-col"); // Changed to querySelectorAll
    const filters = document.querySelectorAll(".filter");
    const defaultFontSize = "40px";
    const activeFontSize = "130px";

    const items = [
        { title: "Clientele", tag: ["works"], img: "stats1.png"},
        { title: "Area Covered", tag: ["works"], img: "stats2.png"},
        { title: "Countries", tag: ["works"], img: "stats3.png"},
        { title: "", tag: ["works"], img: "./blankslide.png"},

        { title: "Client 01: Adidas", tag: ["works"], img: "adidaslogo2.png"},
        { title: "Adidas, Yas Mall, Abu Dubai", tag: ["works"], img: "works1.png"},
        { title: "Adidas Halo Store, Delhi", tag: ["works"], img: "works2.png"},
        { title: "Adidas Dubai Headquaters Gym, Dubai", tag: ["works"], img: "works3.png"},
        { title: "Adidas FO Pulse Store, Kalba UAE", tag: ["works"], img: "works4.png"},
        { title: "Adidas FO Pulse Store, Dubai Outlet Mall", tag: ["works"], img: "works5.png"},
        { title: "Adidas Gym, Dubai", tag: ["works"], img: "works6.png"},
        { title: "Adidas Halo Store, Citywall Mall, New Dubai", tag: ["works"], img: "works7.png"},
        { title: "Adidas Home Of Sport Kids, Dubai", tag: ["works"], img: "works8.png"},
        { title: "Adidas HOS Store, Namal, Tel Aviv", tag: ["works"], img: "works9.png"},
        { title: "Adidas Originals Flagshipstore", tag: ["works"], img: "works10.png"},
        { title: "Adidas Pop Up, Gamers8, Boulevard City", tag: ["works"], img: "works11.png"},
        { title: "Adidas Stadium Store, Nahkeel Mall, Dubai", tag: ["works"], img: "works12.png"},
        { title: "Adidas Home Of Sport Store, UWalk Mall, Dubai", tag: ["works"], img: "works13.jpg"},

        { title: "Client 02: Roberto Cavalli", tag: ["works"], img: "robertologo.png"},
        { title: "Roberto Cavalli Store", tag: ["works"], img: "roberto.jpg"},

        { title: "Client 03: Rolex", tag: ["works"], img: "rolexlogo.png"},
        { title: "Rolex Store", tag: ["works"], img: "rolex.jpg"},

        { title: "Client 04: Seiko", tag: ["works"], img: "seikologo.png"},
        { title: "Seiko Store", tag: ["works"], img: "seiko.jpg"},

        { title: "Retail Interior Design Of The Year - 2022", tag: ["about"], img: "award1.png"},
        { title: "Innovative Architecture Firm Of The Year - 2022", tag: ["about"], img: "award2.png"},
        { title: "Commercial Project Of The Year - 2022", tag: ["about"], img: "award3.png"},

        { title: "Currently", tag: ["experience"], img: "exp4.png"},
        { title: "", tag: ["experience"], img: "blankslide.png"},
        { title: "Previously", tag: ["experience"], img: "exp5.png"},

        { title: "Myself, V Jaya Surya", tag: ["contact"], img: "myphoto.jpg"},
        { title: "Email Address", tag: ["contact"], img: "mail3.png"},
        { title: "Phone Number", tag: ["contact"], img: "phone1.png"}
    ];

    function splitTextIntoSpans(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            const text = element.innerText;
            element.innerHTML = text
                .split("")
                .map((char) => `<span>${char}</span>`)
                .join("");
        });
    }

    function animateFontSize(target, fontSize) {
        const spans = target.querySelectorAll("span");
        gsap.to(spans, {
            fontSize: fontSize,
            stagger: 0.025,
            duration: 0.2,
            ease: "power2.out",
        });
    }

    function clearItems() {
        itemsCols.forEach((col) => {
            col.innerHTML = "";
        });
    }

    function addItems(filter = "all") {
        let colIndex = 0;
        const filteredItems = items.filter(
            (item) => filter === "all" || item.tag.includes(filter)
        );

        filteredItems.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.className = "item";
            itemElement.innerHTML = `<div class="item-img">
                                        <img src="${item.img}" alt="">
                                     </div>
                                     <div class="item-copy"><p style = "color: white">${item.title}</p></div>`;

            itemsCols[colIndex % itemsCols.length].appendChild(itemElement);
            colIndex++;
        });
    }

    function animateItems(filter) {
        gsap.to(itemsContainer, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                clearItems();
                addItems(filter);
                gsap.to(itemsContainer, {
                    opacity: 1,
                    duration: 0.25,
                });
            },
        });
    }

    splitTextIntoSpans(".filter h1");
    animateFontSize(document.querySelector(".filter.active h1"), activeFontSize);
    addItems();

    filters.forEach((filter) => {
        filter.addEventListener("click", function() {
            if (this.classList.contains("active")) {
                return;
            }

            const previousActiveFilterH1 =
            document.querySelector(".filter.active h1");
            animateFontSize(previousActiveFilterH1, defaultFontSize);

            filters.forEach((f) => f.classList.remove("active"));
            this.classList.add("active");

            const newActiveFilterH1 = this.querySelector("h1");
            animateFontSize(newActiveFilterH1, activeFontSize);

            const filterValue = this.getAttribute("data-filter");
            animateItems(filterValue);
        });
    });
});
