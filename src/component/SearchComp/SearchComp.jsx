import './SearchComp.css';

function SearchComp() {

    return (
        <>
            <section className="search-wrapper">
                <form onSubmit="" className="search">
                    <input type="search" name="search" title="search" aria-label="search"
                           placeholder="Welke film bent u op zoek?"/>
                </form>
            </section>
        </>
    );
}

export default SearchComp;