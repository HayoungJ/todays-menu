import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import HeaderTemplate from '../../components/templates/HeaderTemplate';
import PickerTemplate from '../../components/templates/PickerTemplate';
import LocationList from '../../components/organisms/LocationList';
import BaseModal from '../../components/atoms/BaseModal';
import MealForm from '../../components/organisms/MealForm';

import { googleLogout } from '../../api/auth';
import { getLocationByKeyword } from '../../api/map';

import { useUser } from '../../contexts/UserContext';
import { useModal } from '../../contexts/ModalContext';

import { ILocation, IMeal } from '../../types/types';

import styled, { css } from 'styled-components';
import { createUserLocation, createLocationMeal, deleteUserLocation, getLocationMeals, getUserLocations, deleteLocationMeal } from '../../api/common';

const StyledMain = styled.main`
  display: flex;
  flex-flow: column nowrap;

  width: 100vw;
  height: 100vh;
`;

const StyledPicker = styled(PickerTemplate)`
  flex: 1;

  margin: 1rem auto 2.5rem;
`;

const ModalTitle = styled.h3`
  ${({ theme }) => {
    const { fontSize } = theme;
    return css`
      font-size: ${fontSize.md};

      margin: 0;
      padding: 0.7rem ;
    `;
  }}
`;

const ModalContent = styled.div`
  padding: 0.7rem;
`;

const MainPage: FC = () => {
  const router = useRouter();
  const userMenus = [
    {
      label: '위치 등록',
      onClick: () => {
        openLocationModal({
          id: 'location',
          onClose: () => {
            setSearchResult([]);
            setSelectedResult(null);
          }
        });
      },
    },
    {
      label: '로그아웃',
      onClick: async () => {
        await googleLogout();
        router.push('/login');
      },
    },
  ];

  const user = useUser();
  const { openModal: openLocationModal } = useModal();
  const { openModal: openMealModal } = useModal();

  const [locations, setLocations] = useState<ILocation[]>([]);
  const [location, setLocation] = useState<ILocation>({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });
  const [searchResult, setSearchResult] = useState<ILocation[]>([]);
  const [selectedResult, setSelectedResult] = useState<ILocation | null>(null);
  const [isSearchable, setIsSearchable] = useState(true);
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [meal, setMeal] = useState<IMeal | null>(null);
  const [newMeal, setNewMeal] = useState<IMeal>({
    name: '',
    category: '',
    address: '',
    foods: [{
      food: '',
      price: '',
    }],
    far: 0,
  });
  const [isMealAdded, setIsMealAdded] = useState(false);

  const onLocationSelect = (option: string, index: number) => {
    setLocation(locations[index]);
  };

  const handleSubmit = async (result: ILocation) => {
    if (!user?.uid) return;
    await createUserLocation(user.uid, result);
    setSearchResult([]);
    setSelectedResult(null);
    await getLocations(user.uid);
  }

  const handleSearch = async (keyword: string) => {
    if (!isSearchable) {
      setIsSearchable(true);
      return;
    }
    if (keyword === '') {
      setSearchResult([]);
      setSelectedResult(null);
      return;
    }
    const data = await getLocationByKeyword({ keyword, size: 5 }).then((res) => res.data.documents); // debouce 처리 해야함
    const result = data.map((el) => {
      return {
        name: el.place_name,
        address: el.address_name,
        longitude: el.x,
        latitude: el.y,
      }
    });
    setSearchResult(result);
  }

  const handleSearchSelect = (value: ILocation) => {
    setSelectedResult(value);
    setSearchResult([]);
    setIsSearchable(false);
  }

  const handleDelete = async (location: ILocation) => {
    if (!user?.uid) return;
    const locationId = location?.id;
    if (!locationId) return;
    await deleteUserLocation(user.uid, locationId);
    await getLocations(user.uid);
  }

  const getLocations = async (uid: string) => {
    const locations = await getUserLocations(uid).then((data) => {
      return data ? Object.keys(data).map((id) => {
        return {
          id,
          ...data[id]
        }
      }) : [];
    });
    setLocations(locations);
  }

  const getMeals = async () => {
    if (!location?.id) return;
    const meals = await getLocationMeals(location.id).then((data) => {
      return data ? Object.keys(data).map((id) => {
        return {
          id,
          ...data[id]
        }
      }) : [];
    });
    setMeals(meals);
  }

  const pickMeal = () => {
    const length = meals.length;
    if (length === 0) return;
    const index = Math.round(Math.random() * (length - 1));
    setMeal(meals[index]);
  }

  const onMealCancel = () => {
    setNewMeal({
      name: '',
      category: '',
      address: '',
      foods: [{
        food: '',
        price: '',
      }],
      far: 0,
    });
  }

  const onMealSubmit = () => {
    setIsMealAdded(true);
  }

  const createMeal = async () => {
    if (!location?.id) return;
    await createLocationMeal(location.id, newMeal);
    setNewMeal({
      name: '',
      category: '',
      address: '',
      foods: [{
        food: '',
        price: '',
      }],
      far: 0,
    });
  }

  const deleteMeal = async (meal: IMeal) => {
    if (!location?.id || !meal?.id) return;
    await deleteLocationMeal(location.id, meal.id);
    await getMeals();
  }

  const handleMealChange = (value: string | { food: string, price: string }[], key: 'name' | 'category' | 'address' | 'foods') => {
    setNewMeal((prevNewMeal) => {
      return {
        ...prevNewMeal,
        [key]: value,
      }
    });
  }

  useEffect(() => {
    if (!user?.uid) return;
    const fetchData = async () => {
      await getLocations(user.uid);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (locations.length === 0) {
      setLocation({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
      });
      return;
    }
    setLocation(locations[0]);
  }, [locations]);

  useEffect(() => {
    const fetchData = async () => {
      await getMeals();
    }
    fetchData();
  }, [location]);

  useEffect(() => {
    if (!isMealAdded) return;
    const fetchData = async () => {
      if (!location?.id) return;
      await createMeal();
      await getMeals();
    }
    fetchData();
    setIsMealAdded(false);
  }, [isMealAdded]);

  return (
    <StyledMain>
      <HeaderTemplate
        logoURL="/assets/images/text_logo.png"
        profileURL={user?.photoURL ?? 'https://via.placeholder.com/80'}
        location={location.name}
        locationOptions={locations.map((location) => location.name)}
        userMenus={userMenus}
        handleLocationSelect={(option, index) =>
          onLocationSelect(option, index)
        }
      />
      <StyledPicker
        meals={meals}
        meal={meal}
        handlePickMeal={pickMeal}
        handleAddMeal={() => openMealModal({ 
          id: 'meal',
          onCancel: () => onMealCancel(),
          onSubmit: () => onMealSubmit(),
        })}
        handleDeleteMeal={deleteMeal}
      />
      <BaseModal
        id="location"
        Title={<ModalTitle>위치 등록</ModalTitle>}
        Content={
          <ModalContent>
            <LocationList
              locations={locations}
              searchResult={searchResult}
              selectedResult={selectedResult}
              handleSubmit={handleSubmit}
              handleSearch={handleSearch}
              handleSearchSelect={handleSearchSelect}
              handleDelete={handleDelete}
            />
          </ModalContent>
        }
      />
      <BaseModal
        id="meal"
        Title={<ModalTitle>식당 등록</ModalTitle>}
        Content={
          <ModalContent>
            <MealForm
              meal={newMeal}
              searchResult={searchResult}
              selectedResult={selectedResult}
              handleSearch={handleSearch}
              handleSearchSelect={handleSearchSelect}
              handleMealChange={handleMealChange}
            />
          </ModalContent>
        }
      />
    </StyledMain>
  );
}

export default MainPage;