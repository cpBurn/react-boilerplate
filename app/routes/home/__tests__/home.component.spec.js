import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

import Home from '../home.component';
import messages from '../home.messages';
import MaintainerList from '../maintainerList/maintainerList.component';
import LanguageSelector from '../languageSelector/languageSelector.component';


describe('Home: Component', () => {
  const defaultProps = {
    getMaintainers: () => {},
    maintainers: [1, 2, 3],
    language: 'en',
    setLanguage: () => {},
    router: {},
  };

  const component = (props) => (
    <Home {...defaultProps} {...props} />
  );

  it('should render Home root', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.home')).to.have.length(1);
  });

  it('should render <Helmet/>', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(Helmet)).to.have.length(1);
  });

  it('should pass title prop to <Helmet/>', () => {
    const wrapper = shallow(component({}));
    const helmetProps = wrapper.find(Helmet).props();

    expect(helmetProps.title).to.be.a('string');
  });

  it('should render .home__title', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.home__title')).to.have.length(1);
  });

  it('should render welcome message inside .home__title', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.home__title').find(FormattedMessage).prop('id')).to.be.equal(messages.welcome.id);
  });

  it('should render <MaintainerList />', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(MaintainerList)).to.have.length(1);
  });

  it('should pass items prop to <MaintainerList />', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(MaintainerList).prop('items')).to.be.equal(defaultProps.maintainers);
  });

  it('should render <LanguageSelector />', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(LanguageSelector)).to.have.length(1);
  });

  it('should pass props to <LanguageSelector />', () => {
    const setLanguage = spy();
    const wrapper = shallow(component({ setLanguage }));
    const languageSelectorProps = wrapper.find(LanguageSelector).props();

    expect(languageSelectorProps.language).to.be.equal(defaultProps.language);
    expect(languageSelectorProps.router).to.be.equal(defaultProps.router);

    languageSelectorProps.setLanguage();
    expect(setLanguage.calledOnce).to.be.equal(true);
  });

  it('should dispatch getMaintainers action on mount', () => {
    const getMaintainers = spy();
    shallow(component({ getMaintainers }));

    expect(getMaintainers.getCall(0).args[0]).to.be.equal(defaultProps.language);
  });

  it('should dispatch getMaintainers action on language change', () => {
    const getMaintainers = spy();
    const newLanguage = 'de';
    const wrapper = shallow(component({ getMaintainers, language: 'en' }));
    getMaintainers.reset();
    wrapper.setProps({ language: newLanguage });

    expect(getMaintainers.getCall(0).args[0]).to.be.equal(newLanguage);
  });
});
