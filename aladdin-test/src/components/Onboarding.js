import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import Modal from 'react-modal';

import '../App.css';
import CheckboxTree from './Tree'
import Category from "../services/category";
import Loading from "../components/Loading";

function Onboarding() {
  const [checked, setChecked] = useState([])
  const [checkedCategory, setCheckedCategory] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [slideCategories, setSlideCategories] = useState([])
  const [slideCategoriesLoading, setSlideCategoriesLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState(null)
  const [selectedCategoryParentName, setSelectedCategoryParentName] = useState(null)
  const [selectedCategoryChild, setSelectedCategoryChild] = useState([])
  const [selectedCategoryChildLoading, setSelectedCategoryChildLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1165,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  async function getCategoryList() {
    setSlideCategoriesLoading(true)
    try {
      const response = await Category.getList();
      let categoriesItems = []
      response?.data?.articles.forEach((item) => {
        categoriesItems.push({
          id: item.artId,
          label: item.artTitle  ,
          imageId: randomIntFromInterval(1,6),
          hasChildren: item.articles === null,
          children: []
        })
      })
      setSlideCategories(categoriesItems);
      setSlideCategoriesLoading(false);
    } catch (err) {
      console.log(err);
      setSlideCategoriesLoading(false);
    }
  }

  async function selectCategoryById(id, name) {
    setSelectedCategory(id);
    setSelectedCategoryName(name);
    setCategories([]);
    setSelectedCategoryChild([]);
    setCategoriesLoading(true);
    try {
      const response = await Category.get(id);
      let categoriesItems = []
      response?.data?.articles.forEach((item) => {
        categoriesItems.push({
          id: item.artId,
          label: item.artTitle  ,
          hasChildren: item.articles === null,
          children: []
        })
      })
      setCategories(categoriesItems);
      setCategoriesLoading(false);
    } catch (err) {
      console.log(err);
      setCategoriesLoading(false);
    }
  }

  async function updateCategoryList(id) {
    try {
      const response = await Category.get(id);
      let childItems = []
      let categoriesItems = categories;
      const index = categoriesItems.findIndex(item => item.id === id);
      response?.data?.articles.forEach((item) => {
        childItems.push({
          id: item.artId,
          label: item.artTitle ,
          hasChildren: item.articles === null,
          children: []
        })
      })
      if (index >= 0) {
        categoriesItems[index] = {
          ...categoriesItems[index],
          children: childItems
        }

      }
      setCategories([...categoriesItems]);
    } catch (err) {
      console.log(err);
    }
  }

  async function selectCategoryChild(id) {
    setSelectedCategoryChild([]);
    setSelectedCategoryChildLoading(true)
    try {
      const response = await Category.get(id);
      let categoriesItems = [];
      setSelectedCategoryParentName(categories.find((i) => i.id === response?.data?.artParentId).label + ' • ' + response?.data?.artTitle)
      response?.data?.articles.forEach((item) => {
        categoriesItems.push({
          id: item.artId,
          label: item.artTitle  ,
          hasChildren: item.articles === null
        })
      })
      setSelectedCategoryChild(categoriesItems);
      setSelectedCategoryChildLoading(false)
    } catch (err) {
      console.log(err);
      setSelectedCategoryChildLoading(false)
    }
  }

  async function updateCategoryChild(id) {
    try {
      const response = await Category.get(id);
      let childItems = []
      let categoriesItems = selectedCategoryChild;
      const index = categoriesItems.findIndex(item => item.id === id);
      response?.data?.articles.forEach((item) => {
        childItems.push({
          id: item.artId,
          label: item.artTitle  ,
          hasChildren: item.articles === null,
          children: []
        })
      })
      if (index >= 0) {
        categoriesItems[index] = {
          ...categoriesItems[index],
          children: childItems
        }

      }
      setSelectedCategoryChild([...categoriesItems]);
    } catch (err) {
      console.log(err);
    }
  }

  function nextStep() {
    if (checkedCategory.length === 0) {
      setIsOpen(true);
    } else {
      alert('You get to next step');
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function removeCategory(e, id) {
    e.preventDefault();
    setChecked([...checked.filter((itemId) => itemId !== parseInt(id, 10))])
    setCheckedCategory([...checkedCategory.filter((item) => item.id !== parseInt(id, 10))])
  }

  function checkCategory(cat, path, isChild) {
    let newCategory;
    cat.forEach((id) => {
      if(!checked.includes(id) && !newCategory) {
        newCategory = {
          id,
          labels: !isChild ? [selectedCategoryName, ...path] : [selectedCategoryName, selectedCategoryParentName, ...path]
        }
      }

    })
    if (cat.length === 0) {
      setCheckedCategory([]);
      setChecked([]);
    } else {
      let prevState = checkedCategory.filter((item) => cat.includes(parseInt(item.id)));
      if (newCategory) {
        prevState.push(newCategory);
      }
      setCheckedCategory([...prevState]);
      setChecked(cat);
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return (
    <section className="onboarding-section">
      <header>
        <div className="left-header">
          <div className="top">
            <img className="logo" src="./img/logo.svg" alt="Aladdin" />
          </div>
        </div>
        <div className="right-header">
          <ul className="menu">
            <li>
              <div className="dropdown-container">
                <div className="dropdown-toggle" id="connectToggle">
                  John Dankins <i id="connectArrow" className="ri-arrow-down-s-fill"></i>
                </div>
                <div className="dropdown-menu" id="connectDropdown">
                  <ul>
                    <li className="dropdown-link"><a href="#">Settings</a></li>
                    <li className="dropdown-link"><a href="#">Exit</a></li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <img src="./img/avatart.png" alt="Avatar" />
            </li>
          </ul>
        </div>
      </header>
      <article>
        <div className="row justify-content-md-center">
          <div className="col-md-12">
            <h1>Categories</h1>
            <div className="tab-box">
              <ul>
                <li className="active">What are you offering or selling?</li>
                <li>What are you looking to buy?</li>
                <li>Import</li>
              </ul>
            </div>
            <div className="tab-content">
              <label htmlFor="search" className="label-input">Search by product/service category, name, or UNSPSC code</label>
              <form className="input-box">
                <input id="search" type="text" placeholder="Search" />
                  <button>
                    <i className="ri-search-line"></i>
                  </button>
              </form>
              <div className="slider-box">
                <Slider {...settings}>
                  {slideCategories.map((item, index) => {
                    return (<div key={index + '_slider'}
                                 onClick={() => selectCategoryById(item.id, item.label)}
                                 className={selectedCategory === item.id ? 'selected' : ''}>
                              <div className="item-slider">
                                <img src={`./img/slide${item.imageId}.svg`} alt=""/>
                                <div className="text">{item.label}</div>
                              </div>
                            </div>)
                  })}
                </Slider>
                {slideCategoriesLoading ? <Loading height={'160px'} /> : null}
              </div>
              <div className="checkbox-tree">
                <div className="row">
                  <div className="col-md-5 scroll-col border">
                    <CheckboxTree
                      nodes={categories}
                      checked={checked}
                      onCheck={(checked, path) => checkCategory(checked, path)}
                      loadChildNodes={updateCategoryList}
                      selectCategory={selectCategoryChild}
                      classNameNodeContainer="node-container"
                      classNameCheckboxIcon="node-container-icon"
                      classNameParentLabel="parent-label"
                    />
                    {categories.length === 0 &&  !categoriesLoading ? <span className="empty-text">Not selected category</span> : null}
                    {categoriesLoading ? <Loading height={'716px'} /> : null}
                    <button className="button prm first-col">
                      Add your option
                    </button>
                  </div>
                  <div className="col-md-7 scroll-col">
                    <div className="row">
                      <div className="category-child">
                        <CheckboxTree
                          nodes={selectedCategoryChild}
                          checked={checked}
                          onCheck={(checked, path) => checkCategory(checked, path, true)}
                          loadChildNodes={updateCategoryChild}
                          classNameNodeContainer="node-container"
                          classNameCheckboxIcon="node-container-icon"
                          classNameParentLabel="parent-label"
                        />
                        {selectedCategoryChild.length === 0 &&  !selectedCategoryChildLoading ? <span className="empty-text">Not selected category</span> : null}
                        {selectedCategoryChildLoading ? <Loading height={'716px'} /> : null}
                        <button className="button prm white first-col">
                          <i className="ri-add-line"></i> Add your option
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{cleact: "both"}}></div>
            <h3>Selected categories</h3>
            <div className="categories-box">
              <ul>
                {checkedCategory.map((item, index) => {
                  return <li key={index + '_checked_category'}>
                          {item.labels.join(" • ")}
                          <a href="#" onClick={(e) => removeCategory(e, item.id)}>
                            <img src="./img/remove.svg" alt="remove"/>
                          </a>
                        </li>
                })}
                {checkedCategory.length === 0 ? <li>Not selected category</li> : null}
              </ul>
            </div>
          </div>
        </div>
      </article>
      <section className="footer-fixed">
        <section className="row">
          <section className="col-md-2">
            <button className="button prm">
              <i className="ri-arrow-left-line"></i> Save & Leave
            </button>
            <i className="ri-question-line"></i>
          </section>
          <section className="col-md-8">
            <div className="step-box">
              <div className="step-block">
                <div style={{border: '1px solid #FF681A', width: '24px', height: '24px', margin: '0px auto', backgroundColor: 'rgb(255, 104, 26)', borderRadius: '50%', textAlign: 'center', padding: '1px', fontSize: '16px', color: 'rgb(255, 255, 255)', display: 'block', borderWidth: '0px'}}>
                  <a style={{lineHeight: '28px', color: 'rgb(255, 255, 255)'}}><i className="ri-check-line"></i></a></div>
                <a style={{marginTop: '8px', fontSize: '12px', fontWeight: 300, textAlign: 'center', display: 'block', color: 'rgba(36, 41, 46, 0.4)'}}>Event
                  Details</a>
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(255, 104, 26)', right: '0px', left: '50%', marginLeft: '16px'}} />
              </div>
              <div className="step-block">
                <div style={{border: '1px solid #ff681a',width: '24px', height: '24px', margin: '0px auto', backgroundColor: 'rgb(255, 104, 26)', borderRadius: '50%', textAlign: 'center', padding: '1px', fontSize: '16px', color: 'rgb(255, 255, 255)', display: 'block', borderWidth: '0px'}}>
                  <a style={{lineHeight: '28px', color: 'rgb(255, 255, 255)'}}><i className="ri-check-line"></i></a></div>
                <a style={{marginTop: '8px', fontSize: '12px', fontWeight: 300, textAlign: 'center', display: 'block', color: 'rgba(36, 41, 46, 0.4)'}}>Branding</a>
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(255, 104, 26)', left: '0px', right: '50%', marginRight: '16px'}} />
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(255, 104, 26)', right: '0px', left: '50%', marginLeft: '16px'}} />
              </div>
              <div className="step-block">
                <div style={{border: '1px solid #ff681a',width: '24px', height: '24px', margin: '0px auto', backgroundColor: 'rgb(255, 104, 26)', borderRadius: '50%', textAlign: 'center', padding: '1px', fontSize: '16px', color: 'rgb(255, 255, 255)', display: 'block', borderWidth: '0px'}}>
                  <a style={{lineHeight: '28px', color: 'rgb(255, 255, 255)'}}><i className="ri-check-line"></i></a></div>
                <a style={{marginTop: '8px', fontSize: '12px', fontWeight: 300, textAlign: 'center', display: 'block', color: 'rgba(36, 41, 46, 0.4)'}}>Import
                  Attendees</a>
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(255, 104, 26)', left: '0px', right: '50%', marginRight: '16px'}} />
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(255, 104, 26)', right: '0px', left: '50%', marginLeft: '16px'}} />
              </div>
              <div className="step-block">
                <div className={'act-cir'} style={{width: '24px', height: '24px', margin: '0px auto', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', textAlign: 'center', padding: '1px', fontSize: '16px', display: 'block', borderWidth: '0px'}}>
                  <a style={{lineHeight: '28px', color: '#ff681a'}}>4</a></div>
                <a style={{marginTop: '8px', fontSize: '12px', fontWeight: 300, textAlign: 'center', display: 'block', color: 'rgb(36, 41, 46)'}}>Categories</a>
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(255, 104, 26)', left: '0px', right: '50%', marginRight: '16px'}} />
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(206, 214, 224)', right: '0px', left: '50%', marginLeft: '16px'}} />
              </div>
              <div className="step-block">
                <div className={'def-cir'} style={{width: '24px', height: '24px', margin: '0px auto', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', textAlign: 'center', padding: '1px', fontSize: '16px', color: 'rgb(255, 255, 255)', display: 'block', borderWidth: '3px'}}>
                  <span style={{lineHeight: '28px'}}>5</span></div>
                <div style={{marginTop: '8px', fontSize: '12px', fontWeight: 300, textAlign: 'center', display: 'block', color: 'rgba(36, 41, 46, 0.4)'}}>Publish
                </div>
                <div style={{position: 'absolute', top: '36px', height: '1px', borderTop: '1px solid rgb(206, 214, 224)', left: '0px', right: '50%', marginRight: '16px'}} />
              </div>
            </div>
          </section>
          <section className="col-md-2">
            <button className="button prm" style={{border: "none"}}>
              Cancel
            </button>
            <button className="button" onClick={() => nextStep()}>
              Continue
            </button>
          </section>
        </section>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Almost done!"
      >
        <h2>Almost done!</h2>
        <div className="text">
          You haven’t selected any category or product or service.
          This step is mandatory for the business matching.
          Please add at least one category.
        </div>
        <button onClick={closeModal} className="button">OK, got it!</button>
      </Modal>
    </section>
  );
}

export default Onboarding;
