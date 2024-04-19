
export const SwiperTouch = (containerRef) => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event) => {
        touchStartX = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
        touchEndX = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        const deltaX = touchEndX - touchStartX;
        if (deltaX > 50) {
            // Swipe from right to left (scroll right)
            containerRef.current.scrollBy({
                left: -200, // Adjust scroll amount as needed
                behavior: "smooth"
            });
        } else if (deltaX < -50) {
            // Swipe from left to right (scroll left)
            containerRef.current.scrollBy({
                left: 200, // Adjust scroll amount as needed
                behavior: "smooth"
            });
        }
    };

    containerRef.current.addEventListener("touchstart", handleTouchStart);
    containerRef.current.addEventListener("touchmove", handleTouchMove);
    containerRef.current.addEventListener("touchend", handleTouchEnd);

    return () => {
        containerRef.current.removeEventListener("touchstart", handleTouchStart);
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
        containerRef.current.removeEventListener("touchend", handleTouchEnd);
    };
};