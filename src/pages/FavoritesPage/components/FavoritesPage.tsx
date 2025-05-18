import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

type Place = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isFavorite: boolean;
  location: string;
};

const FavoritesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([
    {
      id: 1,
      title: 'Ресторан "У моря"',
      description: "Ресторан морской кухни с панорамным видом на залив",
      image: "https://source.unsplash.com/random/300x200/?restaurant,sea",
      rating: 4.7,
      reviews: 124,
      category: "Рестораны",
      isFavorite: true,
      location: "Санкт-Петербург, наб. реки Мойки, 12",
    },
    {
      id: 2,
      title: "Парк Горького",
      description: "Крупнейший парк культуры и отдыха в центре города",
      image: "https://source.unsplash.com/random/300x200/?park",
      rating: 4.9,
      reviews: 356,
      category: "Парки",
      isFavorite: true,
      location: "Москва, Крымский Вал, 9",
    },
    {
      id: 3,
      title: "Музей современного искусства",
      description: "Коллекция современного искусства XX-XXI веков",
      image: "https://source.unsplash.com/random/300x200/?museum,art",
      rating: 4.5,
      reviews: 87,
      category: "Музеи",
      isFavorite: true,
      location: "Москва, ул. Петровка, 25",
    },
    {
      id: 4,
      title: 'Кофейня "Братья"',
      description: "Уютная кофейня с авторскими десертами",
      image: "https://source.unsplash.com/random/300x200/?coffee,shop",
      rating: 4.8,
      reviews: 215,
      category: "Кафе",
      isFavorite: true,
      location: "Санкт-Петербург, ул. Рубинштейна, 15",
    },
    {
      id: 5,
      title: "Театр оперы и балета",
      description: "Один из ведущих музыкальных театров России",
      image: "https://source.unsplash.com/random/300x200/?theater,opera",
      rating: 4.9,
      reviews: 412,
      category: "Театры",
      isFavorite: true,
      location: "Москва, Театральная пл., 1",
    },
    {
      id: 6,
      title: 'Горнолыжный курорт "Снежный"',
      description: "Курорт с трассами для всех уровней подготовки",
      image: "https://source.unsplash.com/random/300x200/?ski,resort",
      rating: 4.6,
      reviews: 178,
      category: "Активный отдых",
      isFavorite: true,
      location: "Красная Поляна, ул. Горная, 5",
    },
  ]);

  const toggleFavorite = (id: number) => {
    setPlaces(
      places.map((place) =>
        place.id === id ? { ...place, isFavorite: !place.isFavorite } : place
      )
    );
  };

  const filteredPlaces = places.filter(
    (place) =>
      place.isFavorite &&
      (place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Избранные места
      </Typography>

      {/* Поиск и фильтры */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Поиск по названию, описанию или категории"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Button fullWidth variant="outlined" startIcon={<FilterIcon />}>
              Фильтры
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button fullWidth variant="contained" startIcon={<StarIcon />}>
              По рейтингу
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Результаты поиска */}
      {filteredPlaces.length === 0 ? (
        <Box sx={{ textAlign: "center", p: 5 }}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery
              ? "Ничего не найдено"
              : "У вас пока нет избранных мест"}
          </Typography>
          {!searchQuery && (
            <Button variant="contained" sx={{ mt: 2 }} href="/">
              Найти интересные места
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPlaces.map((place) => (
            <Grid item key={place.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={place.image}
                  alt={place.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {place.title}
                    </Typography>
                    <IconButton
                      onClick={() => toggleFavorite(place.id)}
                      color={place.isFavorite ? "error" : "default"}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>

                  <Chip label={place.category} size="small" sx={{ mb: 1.5 }} />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    {place.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocationIcon color="action" fontSize="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      {place.location}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Rating
                        value={place.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {place.rating.toFixed(1)} ({place.reviews} отзывов)
                      </Typography>
                    </Box>
                    <Button size="small">Подробнее</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
