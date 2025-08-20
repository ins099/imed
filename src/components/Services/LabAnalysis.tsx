/* eslint-disable react-native/no-inline-styles */
import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {ms, scale} from 'react-native-size-matters';
import {
  useGetCategoriesByServiceQuery,
  useLazyGetMedicalQuery,
  useLazyGetSubCategoriesByCatIdQuery,
} from '../../redux/apis/services';
import {
  setCategory,
  setMedical,
  setSubCategory,
} from '../../redux/reducers/serviceSlice';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import LoaderModal from '../common/Loader';
import {AnalysisStepOne} from './LabAnalysis/AnalysisStepOne';
import {AnalysisStepThree} from './LabAnalysis/AnalysisStepThree';
import {AnalysisStepTwo} from './LabAnalysis/AnalysisStepTwo';

interface LabAnalysisProps {
  navigation: NavigationProp<any>;
}

export const LabAnalysis: React.FC<LabAnalysisProps> = props => {
  const {navigation} = props;

  const dispatch = useAppDispatch();
  const category = useAppSelector(store => store.serviceOrderSlices.category);
  const subCategory = useAppSelector(
    store => store.serviceOrderSlices.subCategory,
  );
  const serviceStep = useAppSelector(
    store => store.serviceOrderSlices?.serviceStep,
  );

  const pageRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [medicalPlaces, setMedicalPlaces] = useState<any[]>([]);

  const {data} = useGetCategoriesByServiceQuery(
    {service: 2},
    {refetchOnMountOrArgChange: true},
  );
  const categories = data?.data?.categories || [];

  const [getSubCategories, {isLoading: subCategoryLoading}] =
    useLazyGetSubCategoriesByCatIdQuery();
  const [getMedicals, {isLoading}] = useLazyGetMedicalQuery();

  const handleGetSubCategories = async (item: any) => {
    try {
      const response = await getSubCategories({category: item.id});
      if (response?.data) {
        setSubCategories(response.data.data.subCategories);
        dispatch(setCategory(item));
        incrementPage();
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleGetMedicals = async (item: any) => {
    try {
      const response = await getMedicals({subCategoryId: item.id});
      if (response?.data) {
        setMedicalPlaces(response.data.data.medicals);
        dispatch(setSubCategory(item));
        incrementPage();
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const incrementPage = () => {
    pageRef.current?.setPage(page + 1);
  };
  const decrementPage = () => {
    pageRef.current?.setPage(page - 1);
  };

  const onSelectPlace = (item: any) => {
    dispatch(setMedical(item));
    navigation.navigate('PlaceOrder');
  };

  useEffect(() => {
    if (serviceStep !== null) {
      pageRef.current?.setPage(serviceStep);
    }
  }, [serviceStep]);

  return (
    <>
      <View style={styles.container}>
        <PagerView
          ref={pageRef}
          style={{flex: 1}}
          initialPage={page}
          scrollEnabled={false}
          onPageScroll={e => setPage(e.nativeEvent.position)}
          pageMargin={scale(14)}>
          <AnalysisStepOne
            key={'page-1'}
            categories={categories}
            onSelect={handleGetSubCategories}
          />
          <AnalysisStepTwo
            key={'page-2'}
            decrementPage={decrementPage}
            subCategories={subCategories}
            onSelect={handleGetMedicals}
            selectedAnalysis={category?.name || ''}
          />
          <AnalysisStepThree
            key={'page-3'}
            onSelectPlace={onSelectPlace}
            decrementPage={decrementPage}
            medicalPlaces={medicalPlaces}
            selectedTest={subCategory?.name || ''}
          />
        </PagerView>
      </View>
      {(subCategoryLoading || isLoading) && <LoaderModal />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(18),
    paddingBottom: 0,
    flex: 1,
  },
});
