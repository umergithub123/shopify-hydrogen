import { urlWithTrackingParams } from '~/lib/search';
import '../styles/collection-sorting.css';
import {useSearchParams, useNavigate} from 'react-router';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function CollectionSorting() {

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ Reflect the current URL param in the select
  const currentSort = searchParams.get('sortKey') || 'MANUAL';

  function handleSortChange(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortKey', event.target.value);
    newParams.set('sortReverse', 'false');
    // ✅ Triggers the loader with updated params — no full page reload
    navigate(`?${newParams.toString()}`);
  }

  function handleFilterChange(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('price');
    newParams.delete('min');
    newParams.delete('max');
    newParams.set('availability', event.target.value);
    navigate(`?${newParams.toString()}`);
  }

  function minChange(event) {
    setMinPrice(event.target.value);
  }

  function maxChange(event) {
    setMaxPrice(event.target.value);
 }

  function priceFilter(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('availability');
    newParams.set('price', true);
    newParams.set('min', event.target.closest('.price-filter').querySelector('.min-price').value);
    newParams.set('max', event.target.closest('.price-filter').querySelector('.max-price').value);
    navigate(`?${newParams.toString()}`);
  }

  function priceToggle(event) {
    let closestParent = event.target.closest('.price-filter');
    let targetDiv = closestParent.querySelector('.price-label-arrow__content');
    targetDiv.classList.toggle('active');
  }

  function avialableToggle(event) {
    let closestParent = event.target.closest('.availability-filter');
    console.log('closestParent',closestParent);
    let targetDiv = closestParent.querySelector('select');
    targetDiv.classList.toggle('active');
  }
  return (
    <>
      <h4>Filters</h4>
      <div className="collection-sorting">
        <div className="collection-filter">
          <div className="availability-filter">
            <div className="label-filter__header" onClick={avialableToggle}>
              <label htmlFor="filter">Availability</label>
              <ArrowDownIcon className="w-5 h-5" />
            </div>  
            <select id="filter" name="filter" onChange={handleFilterChange}>
              <option value="available">In Stock</option>
              <option value="soldout">Out of Stock</option>
            </select>
          </div>

          <div className="price-filter">
            <div className="price-label-arrow__header" onClick={priceToggle}>
              <label htmlFor="filter">Price</label>
              <ArrowDownIcon className="w-5 h-5" />
            </div>
            <div className="price-label-arrow__content">
              <label htmlFor="points">Points (between 0 and 100):</label>
              <input type="range" onChange={minChange} className="min-price" name="min-range" min="0" max="100" />
              <p>Min: {minPrice} </p>
              <label htmlFor="points">Points (between 0 and 1000):</label>
              <input type="range" onChange={maxChange} className="max-price" name="max-range" min="0" max="2000" />
              <p>Max: {maxPrice}</p>
              <button onClick={priceFilter}>Apply</button>
            </div>  
            </div>  
        </div>
        <form className="collection-sorting-form">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" name="sort" onChange={handleSortChange}>
            <option value="MANUAL">Featured</option>
            <option value="TITLE">Alphabetically, A-Z</option>
            <option value="PRICE">Price: Low to High</option>
          </select>
        </form>
      </div>
    </>  
  );
}