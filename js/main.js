/**
 * FRANCELLA COLLECTION - Boutique de Moda Femenina
 * Front-end Interaction & UI Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initSearchModal();
    initCartDrawer();
    initWishlist();
    initQuickView();
    initSmoothScroll();
    initAmbientMusic();
    initVideoIntroModal();
});

/* ==========================================================================
   1. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById("menu-toggle-btn");
    const closeBtn = document.getElementById("mobile-close-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!menuBtn || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add("active");
        menuBtn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        mobileMenu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) closeMenu();
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
}

/* ==========================================================================
   2. Search Modal Overlay
   ========================================================================== */
function initSearchModal() {
    const searchToggle = document.getElementById("btn-search-toggle");
    const searchOverlay = document.getElementById("search-overlay");
    const searchClose = document.getElementById("search-close-btn");
    const searchInput = document.getElementById("search-input");
    const quickTags = document.querySelectorAll(".quick-tag");

    if (!searchToggle || !searchOverlay) return;

    function openSearch() {
        searchOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 100);
    }

    function closeSearch() {
        searchOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    searchToggle.addEventListener("click", openSearch);
    if (searchClose) searchClose.addEventListener("click", closeSearch);

    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) closeSearch();
    });

    quickTags.forEach(tag => {
        tag.addEventListener("click", closeSearch);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });
}

/* ==========================================================================
   3. Cart Drawer & Bag State
   ========================================================================== */
function initCartDrawer() {
    const cartToggle = document.getElementById("btn-cart-toggle");
    const cartOverlay = document.getElementById("cart-drawer-overlay");
    const cartClose = document.getElementById("cart-drawer-close");
    const continueShopping = document.getElementById("btn-continue-shopping");

    if (!cartToggle || !cartOverlay) return;

    function openCart() {
        cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    cartToggle.addEventListener("click", openCart);
    if (cartClose) cartClose.addEventListener("click", closeCart);
    if (continueShopping) continueShopping.addEventListener("click", closeCart);

    cartOverlay.addEventListener("click", (e) => {
        if (e.target === cartOverlay) closeCart();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && cartOverlay.classList.contains("active")) {
            closeCart();
        }
    });
}

/* ==========================================================================
   4. Wishlist Toggle & Counter
   ========================================================================== */
function initWishlist() {
    const wishlistBadge = document.getElementById("wishlist-badge");
    const wishlistBtns = document.querySelectorAll(".product-wishlist-btn");
    let wishlistCount = 0;

    wishlistBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("active");

            if (btn.classList.contains("active")) {
                wishlistCount++;
            } else {
                wishlistCount = Math.max(0, wishlistCount - 1);
            }

            if (wishlistBadge) {
                wishlistBadge.textContent = wishlistCount;
                wishlistBadge.style.transform = "scale(1.3)";
                setTimeout(() => {
                    wishlistBadge.style.transform = "scale(1)";
                }, 200);
            }
        });
    });
}

/* ==========================================================================
   5. Quick View Modal
   ========================================================================== */
function initQuickView() {
    const qvModal = document.getElementById("quickview-modal");
    const qvClose = document.getElementById("quickview-close-btn");
    const qvImg = document.getElementById("qv-img");
    const qvTitle = document.getElementById("qv-title");
    const qvPrice = document.getElementById("qv-price");
    const qvOldPrice = document.getElementById("qv-old-price");
    const qvBadge = document.getElementById("qv-badge");
    const qvAddBtn = document.getElementById("qv-add-cart-btn");
    const cartBadge = document.getElementById("cart-badge");
    const cartDrawerCount = document.getElementById("cart-drawer-count");
    const cartOverlay = document.getElementById("cart-drawer-overlay");

    if (!qvModal) return;

    function openModal(data) {
        if (qvImg && data.img) qvImg.src = data.img;
        if (qvTitle && data.name) qvTitle.textContent = data.name;
        if (qvPrice && data.price) qvPrice.textContent = data.price + " MXN";
        
        if (qvOldPrice) {
            if (data.oldprice) {
                qvOldPrice.textContent = data.oldprice + " MXN";
                qvOldPrice.style.display = "inline";
            } else {
                qvOldPrice.style.display = "none";
            }
        }

        if (qvBadge) {
            if (data.badge) {
                qvBadge.textContent = data.badge;
                qvBadge.style.display = "inline-block";
            } else {
                qvBadge.style.display = "none";
            }
        }

        qvModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        qvModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Attach to product cards and quickview buttons
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        const btn = card.querySelector(".product-quickview-btn");
        const data = {
            name: card.dataset.name,
            price: card.dataset.price,
            oldprice: card.dataset.oldprice,
            badge: card.dataset.badge,
            img: card.dataset.img
        };

        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                openModal(data);
            });
        }

        // On mobile, tap on image box also opens quickview
        const imgBox = card.querySelector(".product-img-box");
        if (imgBox) {
            imgBox.addEventListener("click", (e) => {
                if (window.innerWidth <= 768 && !e.target.closest(".product-wishlist-btn")) {
                    openModal(data);
                }
            });
        }
    });

    // Size selector buttons in modal
    const sizeBtns = document.querySelectorAll(".size-btn");
    sizeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            sizeBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Add to cart from modal
    if (qvAddBtn) {
        qvAddBtn.addEventListener("click", () => {
            let currentCount = parseInt(cartBadge ? cartBadge.textContent : "2", 10) || 0;
            currentCount++;
            if (cartBadge) cartBadge.textContent = currentCount;
            if (cartDrawerCount) cartDrawerCount.textContent = currentCount;

            closeModal();
            if (cartOverlay) {
                cartOverlay.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    }

    if (qvClose) qvClose.addEventListener("click", closeModal);

    qvModal.addEventListener("click", (e) => {
        if (e.target === qvModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && qvModal.classList.contains("active")) {
            closeModal();
        }
    });
}

/* ==========================================================================
   6. Smooth Anchor Navigation & Header Shadow
   ========================================================================== */
function initSmoothScroll() {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.06)";
        } else {
            navbar.style.boxShadow = "none";
        }
    }, { passive: true });
}

/* ==========================================================================
   7. Ambient Boutique Music Controller (Autoplay + Pause/Play Sync)
   ========================================================================== */
let globalAmbientAudio = null;
let isAudioManuallyPaused = false;

function initAmbientMusic() {
    const audio = document.getElementById("ambient-audio");
    if (!audio) return;
    globalAmbientAudio = audio;

    // UI elements
    const headerBtn = document.getElementById("audio-toggle-btn");
    const headerLabel = headerBtn ? headerBtn.querySelector(".audio-status-text") : null;
    const floatingBtn = document.getElementById("floating-music-btn");
    const floatingLabel = document.getElementById("floating-status-text");

    audio.volume = 0.65; // Volumen ideal de boutique

    function setUIState(isPlaying) {
        if (headerBtn) {
            if (isPlaying) {
                headerBtn.classList.remove("is-paused");
                headerBtn.classList.add("is-playing");
                headerBtn.setAttribute("title", "Pausar música");
                if (headerLabel) headerLabel.textContent = "Pausar";
            } else {
                headerBtn.classList.remove("is-playing");
                headerBtn.classList.add("is-paused");
                headerBtn.setAttribute("title", "Reproducir música");
                if (headerLabel) headerLabel.textContent = "Música";
            }
        }

        if (floatingBtn) {
            if (isPlaying) {
                floatingBtn.classList.remove("is-paused");
                floatingBtn.classList.add("is-playing");
                floatingBtn.setAttribute("title", "Pausar música Boutique Vibe");
                if (floatingLabel) floatingLabel.textContent = "Reproduciendo";
            } else {
                floatingBtn.classList.remove("is-playing");
                floatingBtn.classList.add("is-paused");
                floatingBtn.setAttribute("title", "Reproducir música Boutique Vibe");
                if (floatingLabel) floatingLabel.textContent = "Pausado";
            }
        }
    }

    function playMusic() {
        isAudioManuallyPaused = false;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setUIState(true);
            }).catch(() => {
                // Si el navegador bloquea el autoplay sin interacción, mostrar UI en espera
                setUIState(false);
            });
        }
    }

    function pauseMusic() {
        isAudioManuallyPaused = true;
        audio.pause();
        setUIState(false);
    }

    function toggleMusic() {
        if (audio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }

    if (headerBtn) headerBtn.addEventListener("click", toggleMusic);
    if (floatingBtn) floatingBtn.addEventListener("click", toggleMusic);

    // Intentar reproducción automática inmediata al cargar
    playMusic();

    // Fallback: Si el navegador bloqueó el autoplay unmuted, iniciar al primer toque/clic en cualquier parte
    const startOnUserGesture = () => {
        if (!isAudioManuallyPaused && audio.paused) {
            playMusic();
        }
    };

    window.addEventListener("click", startOnUserGesture, { once: true, passive: true });
    window.addEventListener("touchstart", startOnUserGesture, { once: true, passive: true });
    window.addEventListener("keydown", startOnUserGesture, { once: true, passive: true });
    window.addEventListener("scroll", startOnUserGesture, { once: true, passive: true });
}

/* ==========================================================================
   8. Video Intro Pop-Up Modal (Audio Collision Protection)
   ========================================================================== */
function initVideoIntroModal() {
    const videoOverlay = document.getElementById("video-intro-overlay");
    const introVideo = document.getElementById("intro-video");
    const closeBtn = document.getElementById("close-intro-btn");
    const enterBtn = document.getElementById("enter-boutique-btn");
    const openBtns = document.querySelectorAll(".btn-watch-intro");

    if (!videoOverlay || !introVideo) return;

    let wasMusicPlayingBeforeVideo = false;

    function openVideoModal() {
        // Pausar la música ambiental si está sonando para no chocar con el audio del video
        if (globalAmbientAudio && !globalAmbientAudio.paused) {
            wasMusicPlayingBeforeVideo = true;
            globalAmbientAudio.pause();
            const headerBtn = document.getElementById("audio-toggle-btn");
            const floatingBtn = document.getElementById("floating-music-btn");
            if (headerBtn) {
                headerBtn.classList.remove("is-playing");
                headerBtn.classList.add("is-paused");
            }
            if (floatingBtn) {
                floatingBtn.classList.remove("is-playing");
                floatingBtn.classList.add("is-paused");
            }
        } else {
            wasMusicPlayingBeforeVideo = false;
        }

        videoOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        introVideo.currentTime = 0;
        introVideo.play().catch(() => {});
    }

    function closeVideoModal() {
        introVideo.pause();
        introVideo.currentTime = 0;
        videoOverlay.classList.remove("active");
        document.body.style.overflow = "";

        // Reanudar la música ambiental si estaba sonando antes
        if (wasMusicPlayingBeforeVideo && globalAmbientAudio && !isAudioManuallyPaused) {
            globalAmbientAudio.play().then(() => {
                const headerBtn = document.getElementById("audio-toggle-btn");
                const floatingBtn = document.getElementById("floating-music-btn");
                const headerLabel = headerBtn ? headerBtn.querySelector(".audio-status-text") : null;
                const floatingLabel = document.getElementById("floating-status-text");
                if (headerBtn) {
                    headerBtn.classList.remove("is-paused");
                    headerBtn.classList.add("is-playing");
                    if (headerLabel) headerLabel.textContent = "Pausar";
                }
                if (floatingBtn) {
                    floatingBtn.classList.remove("is-paused");
                    floatingBtn.classList.add("is-playing");
                    if (floatingLabel) floatingLabel.textContent = "Reproduciendo";
                }
            }).catch(() => {});
        }
    }

    openBtns.forEach(btn => {
        btn.addEventListener("click", openVideoModal);
    });

    if (closeBtn) closeBtn.addEventListener("click", closeVideoModal);
    if (enterBtn) enterBtn.addEventListener("click", closeVideoModal);

    videoOverlay.addEventListener("click", (e) => {
        if (e.target === videoOverlay) closeVideoModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && videoOverlay.classList.contains("active")) {
            closeVideoModal();
        }
    });

    // Al terminar el video, permitir reanudar música
    introVideo.addEventListener("ended", () => {
        closeVideoModal();
    });
}
