-- =========================================================
-- PEL Official Product Catalog Database Schema & Seed Data
-- Designed for Amanat Electronics / E-Commerce Backend
-- Compatible with MySQL / MariaDB / PostgreSQL
-- =========================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS product_features;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    sub_category VARCHAR(150) NOT NULL,
    model_title VARCHAR(255) NOT NULL,
    handle VARCHAR(255) NOT NULL UNIQUE,
    vendor VARCHAR(100) DEFAULT 'PEL',
    min_price_pkr DECIMAL(10,2) NOT NULL,
    max_price_pkr DECIMAL(10,2) NOT NULL,
    price_range_pkr VARCHAR(100),
    seo_short_description TEXT,
    official_store_url VARCHAR(500),
    technical_specifications JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Product Variants / SKUs Table
CREATE TABLE product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    variant_title VARCHAR(255) NOT NULL,
    sku VARCHAR(150),
    price_pkr DECIMAL(10,2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Product Key Features Table
CREATE TABLE product_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    feature_text VARCHAR(500) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- SEED DATA
-- =========================================================

INSERT INTO categories (id, name, slug, description) VALUES
(1, 'Air Conditioners', 'air-conditioners', 'PEL InverterOn, T3 Tropical, Floor Standing & Partner Air Conditioners'),
(2, 'Refrigerators & Deep Freezers', 'refrigerators-deep-freezers', 'Glass Door, Digitron Ultra, Prinvo, Life Pro, Room Series & Arctic Freezers'),
(3, 'Water Dispensers', 'water-dispensers', '3-Tap Hot Cold Normal, Glass Door, Pearl & Smart Water Dispensers'),
(4, 'Microwave Ovens', 'microwave-ovens', 'Kitchen Pro Convection Air Fryer, Grill, Solo & Glamour Series'),
(5, 'LED TVs', 'led-tvs', 'PEL Bezel-Less 4K QLED Google TVs & Official Smart TVs'),
(6, 'Washing Machines', 'washing-machines', 'Fully Automatic, Smart Inverter & Semi-Automatic Twin Tub Washers');

-- Product #1: Panasonic BKF Inverter T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(1, 1, 'Panasonic Inverter (PEL Partner)', 'Panasonic BKF Inverter T3 (H&C) Air Conditioner', 'panasonic-bkf-inverter-t3-h-c-air-conditioner', 'eshoppel', 139900, 243900, 'PKR 139,900 - PKR 243,900', 'Experience supreme climate control with the Panasonic BKF Inverter T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/panasonic-bkf-inverter-t3-h-c-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton | White / 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(1, 'White / 1 Ton', 'PEL-PANASONIC-BKF-INVERTER-T3-H-C-AIR-CONDITIONER-47845267701909', 139900, 1),
(1, 'White / 1.5 Ton', 'PEL-PANASONIC-BKF-INVERTER-T3-H-C-AIR-CONDITIONER-47845267734677', 175900, 1),
(1, 'White / 2 Ton', 'PEL-PANASONIC-BKF-INVERTER-T3-H-C-AIR-CONDITIONER-47845267767445', 243900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(1, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(1, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(1, 'Hyper Rapid Cooling within 30 seconds'),
(1, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(1, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #2: PEL InverterOn Cool Pro (Cool Only) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(2, 1, 'InverterOn (Cool Only)', 'PEL InverterOn Cool Pro (Cool Only) Air Conditioner', 'pel-inverteron-cool-pro-cool-only-air-conditioner', ' PEL ', 102900, 129900, 'PKR 102,900 - PKR 129,900', 'Experience supreme climate control with the PEL InverterOn Cool Pro (Cool Only) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-cool-pro-cool-only-air-conditioner', '{"capacities_available":"1 Ton, 1.5 Ton","tonnage_options":"1 Ton | 1.5 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Cool Only","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(2, '1 Ton', 'Cool Pro 12K', 102900, 1),
(2, '1.5 Ton', 'Cool Pro 18K', 129900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(2, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(2, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(2, 'Hyper Rapid Cooling within 30 seconds'),
(2, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(2, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #3: PEL InverterOn Jumbo Cool T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(3, 1, 'InverterOn Wall Mount', 'PEL InverterOn Jumbo Cool T3 (H&C) Air Conditioner', 'pel-inverteron-jumbo-cool-h-c-air-conditioner', 'eshoppel', 129900, 220900, 'PKR 129,900 - PKR 220,900', 'Experience supreme climate control with the PEL InverterOn Jumbo Cool T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-jumbo-cool-h-c-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton | White / 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(3, 'White / 1 Ton', 'PEL-PEL-INVERTERON-JUMBO-COOL-H-C-AIR-CONDITIONER-47364232478869', 129900, 1),
(3, 'White / 1.5 Ton', 'PEL-PEL-INVERTERON-JUMBO-COOL-H-C-AIR-CONDITIONER-47364232511637', 165900, 1),
(3, 'White / 2 Ton', 'PEL-PEL-INVERTERON-JUMBO-COOL-H-C-AIR-CONDITIONER-47364236148885', 220900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(3, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(3, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(3, 'Hyper Rapid Cooling within 30 seconds'),
(3, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(3, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #4: PEL InverterOn ACE Pro (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(4, 1, 'InverterOn ACE Pro Series', 'PEL InverterOn ACE Pro (H&C) Air Conditioner', 'pel-inverteron-ace-pro-h-c-air-conditioner', 'eshoppel', 113900, 134900, 'PKR 113,900 - PKR 134,900', 'Experience supreme climate control with the PEL InverterOn ACE Pro (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-ace-pro-h-c-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(4, 'White / 1 Ton', 'PEL-PEL-INVERTERON-ACE-PRO-H-C-AIR-CONDITIONER-47364208558229', 113900, 1),
(4, 'White / 1.5 Ton', 'PEL-PEL-INVERTERON-ACE-PRO-H-C-AIR-CONDITIONER-47364208590997', 134900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(4, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(4, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(4, 'Hyper Rapid Cooling within 30 seconds'),
(4, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(4, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #5: PEL QLED 65 SMART GOOGLE PLD Ultra HD
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(5, 5, 'PEL 4K QLED Google TVs (Bezel-less)', 'PEL QLED 65 SMART GOOGLE PLD Ultra HD', 'pel-qled-65-smart-google-pld-ultra-hd', 'eshoppel', 195900, 195900, 'PKR 195,900', 'Transform your home entertainment with the PEL QLED 65 SMART GOOGLE PLD Ultra HD. Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/pel-qled-65-smart-google-pld-ultra-hd', '{"screen_sizes":"65 Inch","resolution":"4K Ultra HD (3840 x 2160 Pixels)","display_tech":"Quantum Dot QLED Panel with HDR10+","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(5, '65 Inch', 'QLED-65', 195900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(5, 'Vibrant Quantum Dot Technology with 1 Billion+ True-to-Life Colors'),
(5, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(5, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(5, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(5, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #6: PEL InverterOn Refrigerator PRINVO VCM
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(6, 2, 'Prinvo Series (InverterOn VCM)', 'PEL InverterOn Refrigerator PRINVO VCM', 'pel-inverteron-refrigerator-prinvo-vcm', 'eshoppel', 69900, 102900, 'PKR 69,900 - PKR 102,900', 'Upgrade your kitchen with the PEL InverterOn Refrigerator PRINVO VCM. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-inverteron-refrigerator-prinvo-vcm', '{"available_sizes_liters":"Gold Silk, Silver Moonlight","technology":"InverterOn / Digitron Ultra Smart Inverter","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(6, 'Gold Silk / 2000 (168 LTR)', 'VCM - 2000 Gold Silk', 69900, 0),
(6, 'Gold Silk / 2200 (194 LTR)', 'VCM - 2200 Gold Silk', 75900, 0),
(6, 'Gold Silk / 2350 (240 LTR)', 'VCM - 2350 Gold Silk', 84900, 1),
(6, 'Gold Silk / 2550 (260 LTR)', 'VCM - 2550 Gold Silk', 87900, 1),
(6, 'Gold Silk / 6360 (310 LTR)', 'VCM - 6360 Gold Silk', 96900, 0),
(6, 'Gold Silk / 6460 (334 LTR)', 'VCM - 6460 Gold Silk', 99900, 0),
(6, 'Gold Silk / 21860 (354 LTR)', 'VCM - 21860 Gold Silk', 102900, 0),
(6, 'Silver Moonlight / 2000 (168 LTR)', 'VCM - 2000 Silver Moonlight', 69900, 0),
(6, 'Silver Moonlight / 2200 (194 LTR)', 'VCM - 2200 Silver Moonlight', 75900, 0),
(6, 'Silver Moonlight / 2350 (240 LTR)', 'VCM - 2350 Silver Moonlight', 84900, 0),
(6, 'Silver Moonlight / 2550 (260 LTR)', 'VCM - 2550 Silver Moonlight', 87900, 0),
(6, 'Silver Moonlight / 6360 (310 LTR)', 'VCM - 6360 Silver Moonlight', 96900, 0),
(6, 'Silver Moonlight / 6460 (334 LTR)', 'VCM - 6460 Silver Moonlight', 99900, 0),
(6, 'Silver Moonlight / 21860 (354 LTR)', 'VCM - 21860 Silver Moonlight', 102900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(6, 'InverterOn Smart Variable Speed Compressor (Up to 55% power saving)'),
(6, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(6, 'LVS Technology protecting from severe voltage spikes'),
(6, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(6, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #7: PEL Refrigerator Glass Door
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(7, 2, 'Glass Door Series (InverterOn / Direct Cool)', 'PEL Refrigerator Glass Door', 'pel-refrigerator-glass-door-prism', 'eshoppel', 69900, 113900, 'PKR 69,900 - PKR 113,900', 'Upgrade your kitchen with the PEL Refrigerator Glass Door. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-refrigerator-glass-door-prism', '{"available_sizes_liters":"Red Blaze, Purple Blaze, Pattern Mirror Red","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(7, 'Red Blaze / 2000 (168 LTR)', '2000-Red Blaze', 69900, 0),
(7, 'Red Blaze / 2200 (194 LTR)', '2200-Red Blaze', 75900, 0),
(7, 'Red Blaze / 2350 (240 LTR)', '2350-Red Blaze', 83900, 1),
(7, 'Red Blaze / 2550 (260 LTR)', '2550-Red Blaze', 86900, 1),
(7, 'Red Blaze / 6370 (310 LTR)', '6370-Red Blaze', 96900, 1),
(7, 'Red Blaze / 6470 (334 LTR)', '6470-Red Blaze', 99900, 1),
(7, 'Red Blaze / 21870 (354 LTR)', '21870-Red Blaze', 107900, 1),
(7, 'Red Blaze / 21970 (382 LTR)', '21970-Red Blaze', 110900, 1),
(7, 'Red Blaze / 22270 (408 LTR)', '22270-Red Blaze', 113900, 1),
(7, 'Purple Blaze / 2000 (168 LTR)', '2000-Purple Blaze', 69900, 0),
(7, 'Purple Blaze / 2200 (194 LTR)', '2200-Purple Blaze', 75900, 0),
(7, 'Purple Blaze / 2350 (240 LTR)', '2350-Purple Blaze', 83900, 1),
(7, 'Purple Blaze / 2550 (260 LTR)', '2550-Purple Blaze', 86900, 1),
(7, 'Purple Blaze / 6370 (310 LTR)', '6370-Purple Blaze', 96900, 1),
(7, 'Purple Blaze / 6470 (334 LTR)', '6470-Purple Blaze', 99900, 1),
(7, 'Purple Blaze / 21870 (354 LTR)', '21870-Purple Blaze', 107900, 1),
(7, 'Purple Blaze / 21970 (382 LTR)', '21970-Purple Blaze', 110900, 1),
(7, 'Purple Blaze / 22270 (408 LTR)', '22270-Purple Blaze', 113900, 1),
(7, 'Pattern Mirror Red / 2000 (168 LTR)', '2000-Pattern Mirror Impression - Red', 69900, 0),
(7, 'Pattern Mirror Red / 2200 (194 LTR)', '2200-Pattern Mirror Impression - Red', 75900, 0),
(7, 'Pattern Mirror Red / 2350 (240 LTR)', '2350-Pattern Mirror Impression - Red', 83900, 0),
(7, 'Pattern Mirror Red / 2550 (260 LTR)', '2550-Pattern Mirror Impression - Red', 86900, 0),
(7, 'Pattern Mirror Red / 6370 (310 LTR)', '6370-Pattern Mirror Impression - Red', 96900, 0),
(7, 'Pattern Mirror Red / 6470 (334 LTR)', '6470-Pattern Mirror Impression - Red', 99900, 0),
(7, 'Pattern Mirror Red / 21870 (354 LTR)', '21870-Pattern Mirror Impression - Red', 107900, 0),
(7, 'Pattern Mirror Red / 21970 (382 LTR)', '21970-Pattern Mirror Impression - Red', 110900, 0),
(7, 'Pattern Mirror Red / 22270 (408 LTR)', '22270-Pattern Mirror Impression - Red', 113900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(7, 'Super Fast Ice Making within 25 Minutes'),
(7, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(7, 'LVS Technology protecting from severe voltage spikes'),
(7, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(7, 'Scratch-resistant High Gloss Mirror Glass Door Finish');

-- Product #8: PEL Vertical Inverter Glass Door Deep Freezer
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(8, 2, 'Vertical Inverter Deep Freezers', 'PEL Vertical Inverter Glass Door Deep Freezer', 'pel-vertical-inverter-glass-door-deep-freezer', 'eshoppel', 112900, 112900, 'PKR 112,900', 'Upgrade your kitchen with the PEL Vertical Inverter Glass Door Deep Freezer. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-vertical-inverter-glass-door-deep-freezer', '{"available_sizes_liters":"Hazel Red Blaze","technology":"InverterOn / Digitron Ultra Smart Inverter","cooling_system":"No Frost / Direct Cool Frost Free Air Tower","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(8, 'Hazel Red Blaze / 7D (281 LTR)', '7D-HRB', 112900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(8, 'InverterOn Smart Variable Speed Compressor (Up to 55% power saving)'),
(8, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(8, 'LVS Technology protecting from severe voltage spikes'),
(8, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(8, 'Scratch-resistant High Gloss Mirror Glass Door Finish');

-- Product #9: PEL Digitron Ultra Inverter Curved Glassdoor Refrigerator
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(9, 2, 'Digitron Ultra Smart Inverter Refrigerators', 'PEL Digitron Ultra Inverter Curved Glassdoor Refrigerator', 'pel-digitron-inverteron-refrigerator', 'eshoppel', 108900, 125900, 'PKR 108,900 - PKR 125,900', 'Upgrade your kitchen with the PEL Digitron Ultra Inverter Curved Glassdoor Refrigerator. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-digitron-inverteron-refrigerator', '{"available_sizes_liters":"Red Blaze, Silver Strip Grey, Silver Strip Black","technology":"InverterOn / Digitron Ultra Smart Inverter","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(9, 'Red Blaze / 6370 (310 LTR)', '6370 Digitron Ultra Inverter Curved GlassdoorRed Blaze', 108900, 1),
(9, 'Red Blaze / 6470 (334 LTR)', '6470 Digitron Ultra Inverter Curved GlassdoorRed Blaze', 111900, 1),
(9, 'Red Blaze / 21970 (382 LTR)', '21970 Digitron Ultra Inverter Curved Glassdoor Red Blaze', 119900, 1),
(9, 'Red Blaze / 22270 (408 LTR)', '22270 Digitron Ultra Inverter Curved Glassdoor Red Blaze', 125900, 0),
(9, 'Silver Strip Grey / 6370 (310 LTR)', '6370 Digitron Ultra Inverter Curved Glassdoor Silver Strip Grey', 108900, 1),
(9, 'Silver Strip Grey / 6470 (334 LTR)', '6470 Digitron Ultra Inverter Curved Glassdoor Silver Strip Grey', 111900, 1),
(9, 'Silver Strip Grey / 21970 (382 LTR)', '21970 Digitron Ultra Inverter Curved Glassdoor Silver Strip Grey', 119900, 1),
(9, 'Silver Strip Grey / 22270 (408 LTR)', '22270 Digitron Ultra Inverter Curved Glassdoor Silver Strip Grey', 125900, 1),
(9, 'Silver Strip Black / 6370 (310 LTR)', '6370 Digitron Ultra Inverter Curved Glassdoor Silver Strip Black', 108900, 1),
(9, 'Silver Strip Black / 6470 (334 LTR)', '6470 Digitron Ultra Inverter Curved Glassdoor Silver Strip Black', 111900, 1),
(9, 'Silver Strip Black / 21970 (382 LTR)', '21970 Digitron Ultra Inverter Curved Glassdoor Silver Strip Black', 119900, 1),
(9, 'Silver Strip Black / 22270 (408 LTR)', '22270 Digitron Ultra Inverter Curved Glassdoor Silver Strip Black', 125900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(9, 'InverterOn Smart Variable Speed Compressor (Up to 55% power saving)'),
(9, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(9, 'LVS Technology protecting from severe voltage spikes'),
(9, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(9, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #10: PEL InverterOn Flat Glass Door Refrigerator
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(10, 2, 'Glass Door Series (InverterOn / Direct Cool)', 'PEL InverterOn Flat Glass Door Refrigerator', 'pel-inverteron-flat-glass-door-refrigerator', 'eshoppel', 89900, 120900, 'PKR 89,900 - PKR 120,900', 'Upgrade your kitchen with the PEL InverterOn Flat Glass Door Refrigerator. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-inverteron-flat-glass-door-refrigerator', '{"available_sizes_liters":"Maroon Blaze, Hazel Red Blaze, Koriyan Glass","technology":"InverterOn / Digitron Ultra Smart Inverter","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(10, 'Maroon Blaze / 2350 (240 LTR)', '2350 InverterOn Maroon Blaze', 89900, 1),
(10, 'Maroon Blaze / 2550 (260 LTR)', '2550 InverterOn Maroon Blaze', 93900, 1),
(10, 'Maroon Blaze / 6370 (310 LTR)', '6370 InverterOn Maroon Blaze', 104900, 1),
(10, 'Maroon Blaze / 6470 (334 LTR)', '6470 InverterOn Maroon Blaze', 107900, 1),
(10, 'Maroon Blaze / 21870 (354 LTR)', '21870 InverterOn Maroon Blaze', 114900, 1),
(10, 'Maroon Blaze / 22270 (408 LTR)', '22270 InverterOn Maroon Blaze', 120900, 1),
(10, 'Hazel Red Blaze / 2350 (240 LTR)', '2350 InverterOn HRB', 89900, 1),
(10, 'Hazel Red Blaze / 2550 (260 LTR)', '2550 InverterOn HRB', 93900, 1),
(10, 'Hazel Red Blaze / 6370 (310 LTR)', '6370 InverterOn HRB', 104900, 1),
(10, 'Hazel Red Blaze / 6470 (334 LTR)', '6470 InverterOn HRB', 107900, 1),
(10, 'Hazel Red Blaze / 21870 (354 LTR)', '21870 InverterOn HRB', 114900, 1),
(10, 'Hazel Red Blaze / 22270 (408 LTR)', '22270 InverterOn HRB', 120900, 1),
(10, 'Koriyan Glass / 2350 (240 LTR)', '2350 InverterOn Koriyan Glass', 89900, 1),
(10, 'Koriyan Glass / 2550 (260 LTR)', '2550 InverterOn Koriyan Glass', 93900, 1),
(10, 'Koriyan Glass / 6370 (310 LTR)', '6370 InverterOn Koriyan Glass', 104900, 0),
(10, 'Koriyan Glass / 6470 (334 LTR)', '6470 InverterOn Koriyan Glass', 107900, 0),
(10, 'Koriyan Glass / 21870 (354 LTR)', '21870 InverterOn Koriyan Glass', 114900, 0),
(10, 'Koriyan Glass / 22270 (408 LTR)', '22270 InverterOn Koriyan Glass', 120900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(10, 'InverterOn Smart Variable Speed Compressor (Up to 55% power saving)'),
(10, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(10, 'LVS Technology protecting from severe voltage spikes'),
(10, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(10, 'Scratch-resistant High Gloss Mirror Glass Door Finish');

-- Product #11: PEL InverterOn Sublime Neo T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(11, 1, 'InverterOn Signature Series', 'PEL InverterOn Sublime Neo T3 (H&C) Air Conditioner', 'pel-inverteron-sublime-neo-t3-h-c-air-conditioner', 'eshoppel', 120900, 151900, 'PKR 120,900 - PKR 151,900', 'Experience supreme climate control with the PEL InverterOn Sublime Neo T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-sublime-neo-t3-h-c-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(11, 'White / 1 Ton', 'Sublime Neo T3 White 1 Ton', 120900, 0),
(11, 'White / 1.5 Ton', 'Sublime Neo T3 White 1.5 Ton', 151900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(11, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(11, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(11, 'Hyper Rapid Cooling within 30 seconds'),
(11, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(11, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #12: PEL InverterOn Jumbo DC Prime Plus Wifi T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(12, 1, 'InverterOn Jumbo DC Prime Series', 'PEL InverterOn Jumbo DC Prime Plus Wifi T3 (H&C) Air Conditioner', 'pel-inverteron-jumbo-dc-prime-plus-wifi-t3-h-c-air-conditioner', 'eshoppel', 138900, 181900, 'PKR 138,900 - PKR 181,900', 'Experience supreme climate control with the PEL InverterOn Jumbo DC Prime Plus Wifi T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-jumbo-dc-prime-plus-wifi-t3-h-c-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"Yes (PEL Smart App Enabled)","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(12, 'White / 1 Ton', 'PEL-PEL-INVERTERON-JUMBO-DC-PRIME-PLUS-WIFI-T3-H-C-AIR-CONDITIONER-46016540442773', 138900, 1),
(12, 'White / 1.5 Ton', 'PEL-PEL-INVERTERON-JUMBO-DC-PRIME-PLUS-WIFI-T3-H-C-AIR-CONDITIONER-46016540475541', 181900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(12, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(12, 'Built-in Wi-Fi Smart Control via Smartphone App'),
(12, 'Hyper Rapid Cooling within 30 seconds'),
(12, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(12, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #13: PEL InverterOn Cool Breeze Air Conditioner (Cool Only)
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(13, 1, 'InverterOn (Cool Only)', 'PEL InverterOn Cool Breeze Air Conditioner (Cool Only)', 'pel-cool-breeze-air-conditioner-inv-cool-only', ' PEL ', 98900, 127900, 'PKR 98,900 - PKR 127,900', 'Experience supreme climate control with the PEL InverterOn Cool Breeze Air Conditioner (Cool Only). Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-cool-breeze-air-conditioner-inv-cool-only', '{"capacities_available":"1 Ton, 1.5 Ton","tonnage_options":"1 Ton | 1.5 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Cool Only","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(13, '1 Ton', 'PEL-PEL-COOL-BREEZE-AIR-CONDITIONER-INV-COOL-ONLY-47002838040725', 98900, 0),
(13, '1.5 Ton', 'PEL-PEL-COOL-BREEZE-AIR-CONDITIONER-INV-COOL-ONLY-47002838073493', 127900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(13, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(13, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(13, 'Hyper Rapid Cooling within 30 seconds'),
(13, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(13, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #14: PEL InverterOn ATOM (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(14, 1, 'InverterOn ATOM Series', 'PEL InverterOn ATOM (H&C) Air Conditioner', 'pel-inverteron-atom-h-c-air-conditioner', 'PEL', 97900, 115900, 'PKR 97,900 - PKR 115,900', 'Experience supreme climate control with the PEL InverterOn ATOM (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-atom-h-c-air-conditioner', '{"capacities_available":"1 Ton, 1.5 Ton","tonnage_options":"1 Ton | 1.5 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(14, '1 Ton', 'PEL-PEL-INVERTERON-ATOM-H-C-AIR-CONDITIONER-47002767425685', 97900, 1),
(14, '1.5 Ton', 'PEL-PEL-INVERTERON-ATOM-H-C-AIR-CONDITIONER-47002767458453', 115900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(14, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(14, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(14, 'Hyper Rapid Cooling within 30 seconds'),
(14, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(14, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #15: PEL 425 3Taps Straight Glass Door Water Dispenser
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(15, 2, 'Glass Door Series (InverterOn / Direct Cool)', 'PEL 425 3Taps Straight Glass Door Water Dispenser', 'pel-425-3taps-straight-glass-door-water-dispenser', 'eshoppel', 39500, 39500, 'PKR 39,500', 'Upgrade your kitchen with the PEL 425 3Taps Straight Glass Door Water Dispenser. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-425-3taps-straight-glass-door-water-dispenser', '{"available_sizes_liters":"Marine Impression, Red Blaze, Maroon Blaze","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(15, 'Marine Impression', 'PEL-PEL-425-3TAPS-STRAIGHT-GLASS-DOOR-WATER-DISPENSER-46890230120597', 39500, 0),
(15, 'Red Blaze', 'PEL-PEL-425-3TAPS-STRAIGHT-GLASS-DOOR-WATER-DISPENSER-46890222387349', 39500, 1),
(15, 'Maroon Blaze', 'PEL-PEL-425-3TAPS-STRAIGHT-GLASS-DOOR-WATER-DISPENSER-46890222452885', 39500, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(15, 'Super Fast Ice Making within 25 Minutes'),
(15, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(15, 'LVS Technology protecting from severe voltage spikes'),
(15, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(15, 'Scratch-resistant High Gloss Mirror Glass Door Finish');

-- Product #16: PEL 525 3Taps Curved Glass Door Water Dispenser
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(16, 2, 'Glass Door Series (InverterOn / Direct Cool)', 'PEL 525 3Taps Curved Glass Door Water Dispenser', 'pel-525-3taps-curved-glass-door-water-dispenser', 'eshoppel', 40500, 40500, 'PKR 40,500', 'Upgrade your kitchen with the PEL 525 3Taps Curved Glass Door Water Dispenser. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-525-3taps-curved-glass-door-water-dispenser', '{"available_sizes_liters":"Hazel Red Blaze, Red Blaze, Grey Blaze","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(16, 'Hazel Red Blaze', 'PEL-PEL-525-3TAPS-CURVED-GLASS-DOOR-WATER-DISPENSER-46890203316373', 40500, 1),
(16, 'Red Blaze', 'PEL-PEL-525-3TAPS-CURVED-GLASS-DOOR-WATER-DISPENSER-46890203283605', 40500, 1),
(16, 'Grey Blaze', 'PEL-PEL-525-3TAPS-CURVED-GLASS-DOOR-WATER-DISPENSER-46890203349141', 40500, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(16, 'Super Fast Ice Making within 25 Minutes'),
(16, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(16, 'LVS Technology protecting from severe voltage spikes'),
(16, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(16, 'Scratch-resistant High Gloss Mirror Glass Door Finish');

-- Product #17: PEL QLED 43 Smart Google Bezel-less LED TV
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(17, 5, 'PEL 4K QLED Google TVs (Bezel-less)', 'PEL QLED 43 Smart Google Bezel-less LED TV', 'pel-qled-43-smart-google-bezel-less-led-tv', 'eshoppel', 81900, 81900, 'PKR 81,900', 'Transform your home entertainment with the PEL QLED 43 Smart Google Bezel-less LED TV. Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/pel-qled-43-smart-google-bezel-less-led-tv', '{"screen_sizes":"43 Inch","resolution":"4K Ultra HD (3840 x 2160 Pixels)","display_tech":"Quantum Dot QLED Panel with HDR10+","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(17, '43 Inch', 'PEL-PEL-QLED-43-SMART-GOOGLE-BEZEL-LESS-LED-TV-46503816167573', 81900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(17, 'Vibrant Quantum Dot Technology with 1 Billion+ True-to-Life Colors'),
(17, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(17, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(17, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(17, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #18: PEL Kitchen Pro 30 LTR Inverter Convection + Air Fryer Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(18, 4, 'Convection & Air Fryer Microwave Ovens', 'PEL Kitchen Pro 30 LTR Inverter Convection + Air Fryer Microwave Oven', 'pel-kitchen-pro-30-ltr-microwave-oven', 'PEL', 62900, 62900, 'PKR 62,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Kitchen Pro 30 LTR Inverter Convection + Air Fryer Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-kitchen-pro-30-ltr-microwave-oven', '{"capacity_liters":"20L, 23L, 26L, 28L, 30L","type":"Convection & Air Fryer Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Convection, Air Fryer, Grill, Defrost, Microwave","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(18, 'Default Title', 'PEL-PEL-KITCHEN-PRO-30-LTR-MICROWAVE-OVEN-46430557274261', 62900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(18, 'Healthier Oil-Free Air Frying & 360° Convection Baking'),
(18, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(18, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(18, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(18, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #19: PEL Kitchen Pro 26 LTR Convection + Air Fryer Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(19, 4, 'Convection & Air Fryer Microwave Ovens', 'PEL Kitchen Pro 26 LTR Convection + Air Fryer Microwave Oven', 'pel-kitchen-pro-26-ltr-microwave-oven', 'PEL', 47900, 47900, 'PKR 47,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Kitchen Pro 26 LTR Convection + Air Fryer Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-kitchen-pro-26-ltr-microwave-oven', '{"capacity_liters":"20L, 23L, 26L, 28L, 30L","type":"Convection & Air Fryer Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Convection, Air Fryer, Grill, Defrost, Microwave","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(19, 'Default Title', 'PEL-PEL-KITCHEN-PRO-26-LTR-MICROWAVE-OVEN-46430518739093', 47900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(19, 'Healthier Oil-Free Air Frying & 360° Convection Baking'),
(19, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(19, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(19, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(19, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #20: PEL Kitchen Pro 28 LTR Grill Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(20, 4, 'Grill Microwave Ovens', 'PEL Kitchen Pro 28 LTR Grill Microwave Oven', 'pel-kitchen-pro-28-ltr-microwave-oven', 'PEL', 33900, 33900, 'PKR 33,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Kitchen Pro 28 LTR Grill Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-kitchen-pro-28-ltr-microwave-oven', '{"capacity_liters":"20L, 23L, 26L, 28L, 30L","type":"Grill Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Grill, Microwave, Combination Cooking","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(20, 'Default Title', 'PEL-PEL-KITCHEN-PRO-28-LTR-MICROWAVE-OVEN-46430516674709', 33900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(20, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(20, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(20, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(20, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(20, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #21: PEL Kitchen Pro 23 LTR Grill Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(21, 4, 'Grill Microwave Ovens', 'PEL Kitchen Pro 23 LTR Grill Microwave Oven', 'pel-kitchen-pro-23-ltr-microwave-oven', ' PEL ', 30900, 30900, 'PKR 30,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Kitchen Pro 23 LTR Grill Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-kitchen-pro-23-ltr-microwave-oven', '{"capacity_liters":"20L, 23L, 26L, 28L, 30L","type":"Grill Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Grill, Microwave, Combination Cooking","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(21, 'Default Title', 'PEL-PEL-KITCHEN-PRO-23-LTR-MICROWAVE-OVEN-46430516215957', 30900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(21, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(21, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(21, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(21, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(21, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #22: PEL InverterOn Prismo T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(22, 1, 'InverterOn Signature Series', 'PEL InverterOn Prismo T3 (H&C) Air Conditioner', 'pel-inverteron-prismo-t3-h-c-air-conditioner', ' PEL ', 128900, 222900, 'PKR 128,900 - PKR 222,900', 'Experience supreme climate control with the PEL InverterOn Prismo T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-prismo-t3-h-c-air-conditioner', '{"capacities_available":"1 Ton, 1.5 Ton, 2 Ton","tonnage_options":"1 Ton | 1.5 Ton | 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(22, '1 Ton', 'Prismo T3 1 Ton', 128900, 1),
(22, '1.5 Ton', 'Prismo T3 1.5 Ton', 160900, 1),
(22, '2 Ton', 'Prismo T3 2 Ton', 222900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(22, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(22, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(22, 'Hyper Rapid Cooling within 30 seconds'),
(22, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(22, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #23: PEL InverterOn Fit Cool T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(23, 1, 'InverterOn Fit Series', 'PEL InverterOn Fit Cool T3 (H&C) Air Conditioner', 'pel-inverteron-fit-cool-t3-h-c-air-conditioner', 'PEL', 128900, 222900, 'PKR 128,900 - PKR 222,900', 'Experience supreme climate control with the PEL InverterOn Fit Cool T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-fit-cool-t3-h-c-air-conditioner', '{"capacities_available":"1 Ton, 1.5 Ton, 2 Ton","tonnage_options":"1 Ton | 1.5 Ton | 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(23, '1 Ton', 'Fit Cool 1 Ton', 128900, 0),
(23, '1.5 Ton', 'Fit Cool 1.5 Ton', 165900, 0),
(23, '2 Ton', 'Fit Cool 2 Ton', 222900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(23, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(23, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(23, 'Hyper Rapid Cooling within 30 seconds'),
(23, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(23, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #24: Panasonic 75 LED 4K Google Certified (MX 740 Series)
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(24, 5, 'Panasonic 4K Google Certified LED TVs', 'Panasonic 75 LED 4K Google Certified (MX 740 Series)', 'panasonic-75-led-4k-google-certified-mx-740-series', 'eshoppel', 339900, 339900, 'PKR 339,900', 'Transform your home entertainment with the Panasonic 75 LED 4K Google Certified (MX 740 Series). Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/panasonic-75-led-4k-google-certified-mx-740-series', '{"screen_sizes":"75 Inch","resolution":"4K Ultra HD (3840 x 2160 Pixels)","display_tech":"A+ Grade IPS LED Panel","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(24, 'Default Title', 'PEL-PANASONIC-75-LED-4K-GOOGLE-CERTIFIED-MX-740-SERIES-46373408800917', 339900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(24, 'Crystal Clear High-Definition Visuals with Ultra-Narrow Bezel'),
(24, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(24, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(24, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(24, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #25: PEL QLED 50 Smart Google Bezel-less LED TV
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(25, 5, 'PEL 4K QLED Google TVs (Bezel-less)', 'PEL QLED 50 Smart Google Bezel-less LED TV', 'pel-qled-50-smart-google-bezel-less-led-tv', 'eshoppel', 111900, 111900, 'PKR 111,900', 'Transform your home entertainment with the PEL QLED 50 Smart Google Bezel-less LED TV. Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/pel-qled-50-smart-google-bezel-less-led-tv', '{"screen_sizes":"50 Inch","resolution":"4K Ultra HD (3840 x 2160 Pixels)","display_tech":"Quantum Dot QLED Panel with HDR10+","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(25, '50 Inch', 'PEL-PEL-QLED-50-SMART-GOOGLE-BEZEL-LESS-LED-TV-46373271109781', 111900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(25, 'Vibrant Quantum Dot Technology with 1 Billion+ True-to-Life Colors'),
(25, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(25, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(25, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(25, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #26: PEL QLED 32 Smart Google Bezel-less LED TV
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(26, 5, 'PEL 4K QLED Google TVs (Bezel-less)', 'PEL QLED 32 Smart Google Bezel-less LED TV', 'pel-qled-32-smart-google-bezel-less-led-tv', 'eshoppel', 53900, 53900, 'PKR 53,900', 'Transform your home entertainment with the PEL QLED 32 Smart Google Bezel-less LED TV. Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/pel-qled-32-smart-google-bezel-less-led-tv', '{"screen_sizes":"32 Inch","resolution":"HD / Full HD (1366x768 / 1920x1080)","display_tech":"Quantum Dot QLED Panel with HDR10+","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(26, '32 Inch', 'PEL-PEL-QLED-32-SMART-GOOGLE-BEZEL-LESS-LED-TV-46342442844309', 53900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(26, 'Vibrant Quantum Dot Technology with 1 Billion+ True-to-Life Colors'),
(26, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(26, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(26, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(26, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #27: PEL InverterOn Jumbo X T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(27, 1, 'InverterOn Signature Series', 'PEL InverterOn Jumbo X T3 (H&C) Air Conditioner', 'pel-inverteron-jumbo-x-t3-h-c-air-conditioner', 'eshoppel', 134900, 227900, 'PKR 134,900 - PKR 227,900', 'Experience supreme climate control with the PEL InverterOn Jumbo X T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-jumbo-x-t3-h-c-air-conditioner', '{"capacities_available":"1 Ton, 1.5 Ton, 2 Ton","tonnage_options":"1 Ton / Black | 1.5 Ton / Black | 2 Ton / Black","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(27, '1 Ton / Black', 'PEL-PEL-INVERTERON-JUMBO-X-T3-H-C-AIR-CONDITIONER-46184472510613', 134900, 1),
(27, '1.5 Ton / Black', 'PEL-PEL-INVERTERON-JUMBO-X-T3-H-C-AIR-CONDITIONER-46184472543381', 176900, 1),
(27, '2 Ton / Black', 'PEL-PEL-INVERTERON-JUMBO-X-T3-H-C-AIR-CONDITIONER-46184472576149', 227900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(27, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(27, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(27, 'Hyper Rapid Cooling within 30 seconds'),
(27, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(27, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #28: PEL InverterOn Fit Graphite T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(28, 1, 'InverterOn Fit Series', 'PEL InverterOn Fit Graphite T3 (H&C) Air Conditioner', 'pel-inverteron-fit-graphite-air-conditioner', 'eshoppel', 128900, 222900, 'PKR 128,900 - PKR 222,900', 'Experience supreme climate control with the PEL InverterOn Fit Graphite T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-fit-graphite-air-conditioner', '{"capacities_available":"1 Ton, 1.5 Ton, 2 Ton","tonnage_options":"1 Ton | 1.5 Ton | 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(28, '1 Ton', 'PEL-PEL-INVERTERON-FIT-GRAPHITE-AIR-CONDITIONER-46155134664853', 128900, 1),
(28, '1.5 Ton', 'PEL-PEL-INVERTERON-FIT-GRAPHITE-AIR-CONDITIONER-46155134697621', 162900, 1),
(28, '2 Ton', 'PEL-PEL-INVERTERON-FIT-GRAPHITE-AIR-CONDITIONER-46155134730389', 222900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(28, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(28, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(28, 'Hyper Rapid Cooling within 30 seconds'),
(28, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(28, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #29: Panasonic 65 LED 4K Google Certified (MX 740 Series)
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(29, 5, 'Panasonic 4K Google Certified LED TVs', 'Panasonic 65 LED 4K Google Certified (MX 740 Series)', 'panasonic-65-led-4k-google-certified-mx-740-series', 'eshoppel', 233900, 233900, 'PKR 233,900', 'Transform your home entertainment with the Panasonic 65 LED 4K Google Certified (MX 740 Series). Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/panasonic-65-led-4k-google-certified-mx-740-series', '{"screen_sizes":"65 Inch","resolution":"4K Ultra HD (3840 x 2160 Pixels)","display_tech":"A+ Grade IPS LED Panel","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(29, 'Default Title', 'PEL-PANASONIC-65-LED-4K-GOOGLE-CERTIFIED-MX-740-SERIES-46014282760341', 233900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(29, 'Crystal Clear High-Definition Visuals with Ultra-Narrow Bezel'),
(29, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(29, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(29, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(29, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #30: Panasonic 55 LED 4K Google Certified (MX 740 Series)
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(30, 5, 'Panasonic 4K Google Certified LED TVs', 'Panasonic 55 LED 4K Google Certified (MX 740 Series)', 'panasonic-55-led-4k-google-certified-mx-740-series', 'eshoppel', 142000, 142000, 'PKR 142,000', 'Transform your home entertainment with the Panasonic 55 LED 4K Google Certified (MX 740 Series). Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/panasonic-55-led-4k-google-certified-mx-740-series', '{"screen_sizes":"55 Inch","resolution":"4K Ultra HD (3840 x 2160 Pixels)","display_tech":"A+ Grade IPS LED Panel","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(30, 'Default Title', 'PEL-PANASONIC-55-LED-4K-GOOGLE-CERTIFIED-MX-740-SERIES-46014274011285', 142000, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(30, 'Crystal Clear High-Definition Visuals with Ultra-Narrow Bezel'),
(30, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(30, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(30, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(30, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #31: PEL InverterOn Ultimate 4 Ton Floor Standing Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(31, 1, 'Floor Standing & Commercial AC', 'PEL InverterOn Ultimate 4 Ton Floor Standing Air Conditioner', 'pel-inverteron-ultimate-4-ton-floor-standing-air-conditioner', 'eshoppel', 514900, 514900, 'PKR 514,900', 'Experience supreme climate control with the PEL InverterOn Ultimate 4 Ton Floor Standing Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-ultimate-4-ton-floor-standing-air-conditioner', '{"capacities_available":"4 Ton","tonnage_options":"4 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(31, '4 Ton', 'PEL-PEL-INVERTERON-ULTIMATE-4-TON-FLOOR-STANDING-AIR-CONDITIONER-45630080024725', 514900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(31, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(31, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(31, 'Hyper Rapid Cooling within 30 seconds'),
(31, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(31, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #32: PEL InverterOn Supreme Round Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(32, 1, 'Floor Standing & Commercial AC', 'PEL InverterOn Supreme Round Air Conditioner', 'pel-inverteron-supreme-round-air-conditioner', 'eshoppel', 309900, 309900, 'PKR 309,900', 'Experience supreme climate control with the PEL InverterOn Supreme Round Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-supreme-round-air-conditioner', '{"capacities_available":"2 Ton","tonnage_options":"2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(32, '2 Ton', 'PEL-PEL-INVERTERON-SUPREME-ROUND-AIR-CONDITIONER-42841723404437', 309900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(32, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(32, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(32, 'Hyper Rapid Cooling within 30 seconds'),
(32, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(32, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #33: PEL InverterOn Bold + Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(33, 1, 'Floor Standing & Commercial AC', 'PEL InverterOn Bold + Air Conditioner', 'pel-inverteron-bold-air-conditioner', 'eshoppel', 279900, 279900, 'PKR 279,900', 'Experience supreme climate control with the PEL InverterOn Bold + Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-bold-air-conditioner', '{"capacities_available":"2 Ton","tonnage_options":"2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(33, '2 Ton', 'PEL-PEL-INVERTERON-BOLD-AIR-CONDITIONER-42841721208981', 279900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(33, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(33, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(33, 'Hyper Rapid Cooling within 30 seconds'),
(33, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(33, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #34: PEL HD 32 Non Smart Bezel-less LED TV
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(34, 5, 'PEL HD Bezel-less LED TVs', 'PEL HD 32 Non Smart Bezel-less LED TV', 'pel-hd-32-non-smart-bezel-less-led-tv', 'eshoppel', 37900, 37900, 'PKR 37,900', 'Transform your home entertainment with the PEL HD 32 Non Smart Bezel-less LED TV. Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/pel-hd-32-non-smart-bezel-less-led-tv', '{"screen_sizes":"32 Inch","resolution":"HD / Full HD (1366x768 / 1920x1080)","display_tech":"A+ Grade IPS LED Panel","operating_system":"Standard TV (USB Multimedia)","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(34, '32 Inch', '32 Bezel-less LED', 37900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(34, 'Crystal Clear High-Definition Visuals with Ultra-Narrow Bezel'),
(34, 'Plug and Play USB Media Player with Movie Subtitle Support'),
(34, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(34, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(34, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #35: PEL QLED 58 Smart Google Bezel-less LED TV
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(35, 5, 'PEL 4K QLED Google TVs (Bezel-less)', 'PEL QLED 58 Smart Google Bezel-less LED TV', 'pel-hdf-55-smart-google-pld-uhd-4k', 'eshoppel', 130900, 130900, 'PKR 130,900', 'Transform your home entertainment with the PEL QLED 58 Smart Google Bezel-less LED TV. Featuring razor-sharp visuals, vibrant colors, Dolby Audio, and seamless Google TV smart integration, it brings cinematic excellence to your living room.', 'https://eshop.pel.com.pk/products/pel-hdf-55-smart-google-pld-uhd-4k', '{"screen_sizes":"58 Inch","resolution":"4K Ultra HD (3840 x 2160 Pixels)","display_tech":"Quantum Dot QLED Panel with HDR10+","operating_system":"Google TV / Android OS with Google Play Store","audio":"Dolby Audio Surround Sound with Built-in Stereo Speakers (20W-24W)","connectivity":"HDMI 2.1, USB 2.0/3.0, Optical Audio, Dual-Band Wi-Fi, Bluetooth 5.0"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(35, '58 Inch', '58 Q LED', 130900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(35, 'Vibrant Quantum Dot Technology with 1 Billion+ True-to-Life Colors'),
(35, 'Official Google TV OS with Google Assistant Voice Remote & Chromecast Built-in'),
(35, 'Dolby Digital Audio delivering immersive cinematic home theater acoustics'),
(35, 'Frameless Bezel-less Aesthetic Design maximizing viewable screen estate'),
(35, 'Built-in YouTube, Netflix, Prime Video, and thousands of streaming apps');

-- Product #36: PEL Table-Top Classic 115 Water Dispenser
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(36, 3, 'Table-Top Compact Water Dispensers', 'PEL Table-Top Classic 115 Water Dispenser', 'pel-table-top-classic-115-water-dispenser', 'eshoppel', 29500, 29500, 'PKR 29,500', 'Enjoy refreshing chilled and instant hot water with the PEL Table-Top Classic 115 Water Dispenser. Designed with food-grade stainless steel tanks, robust compressor cooling, and elegant aesthetics, it is perfect for homes and offices.', 'https://eshop.pel.com.pk/products/pel-table-top-classic-115-water-dispenser', '{"taps":"3 Taps (Hot, Normal, Cold Water)","refrigerator_compartment":"Yes (Spacious Lower Refrigerator Cabinet)","compressor":"High-Efficiency Tropicalized Compressor","tank_material":"100% Food-Grade Stainless Steel Water Tank (Rust-Proof)","cooling_capacity":"2.5 - 3.5 L/hr (Cold ≤ 10°C)","heating_capacity":"5.0 L/hr (Hot ≥ 90°C)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(36, 'White', '115 Table Top Classic', 29500, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(36, '3-Tap Convenience with instant Hot, Ambient, and Chilled water'),
(36, 'Durable High-Impact Rust-Proof ABS Body'),
(36, 'Child Safety Lock on Hot Water Dispensing Faucet'),
(36, 'Low Noise Eco-Friendly Compressor with Overheat Protection'),
(36, 'Spacious Chilling Refrigerator Compartment for Beverages & Snacks');

-- Product #37: PEL Glass Door Refrigerator Room Series
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(37, 2, 'Room Series (Compact/Bedroom Refrigerator)', 'PEL Glass Door Refrigerator Room Series', 'pel-glass-door-refrigerator-room-series', 'eshoppel', 53900, 53900, 'PKR 53,900', 'Upgrade your kitchen with the PEL Glass Door Refrigerator Room Series. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-glass-door-refrigerator-room-series', '{"available_sizes_liters":"Red Blaze, Pattern Mirror Impression","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(37, 'Red Blaze / 1400 (140 LTR)', 'PEL-PEL-GLASS-DOOR-REFRIGERATOR-ROOM-SERIES-44882068799637', 53900, 0),
(37, 'Pattern Mirror Impression / 1400 (140 LTR)', 'PEL-PEL-GLASS-DOOR-REFRIGERATOR-ROOM-SERIES-44882080170133', 53900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(37, 'Super Fast Ice Making within 25 Minutes'),
(37, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(37, 'LVS Technology protecting from severe voltage spikes'),
(37, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(37, 'Scratch-resistant High Gloss Mirror Glass Door Finish');

-- Product #38: PEL InverterOn AERO Extend (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(38, 1, 'InverterOn AERO Extend Series', 'PEL InverterOn AERO Extend (H&C) Air Conditioner', 'pel-inverteron-aero-plus-air-conditioner', 'eshoppel', 115900, 140900, 'PKR 115,900 - PKR 140,900', 'Experience supreme climate control with the PEL InverterOn AERO Extend (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-aero-plus-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(38, 'White / 1 Ton', 'PEL-PEL-INVERTERON-AERO-PLUS-AIR-CONDITIONER-42841609011349', 115900, 1),
(38, 'White / 1.5 Ton', 'PEL-PEL-INVERTERON-AERO-PLUS-AIR-CONDITIONER-42841609044117', 140900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(38, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(38, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(38, 'Hyper Rapid Cooling within 30 seconds'),
(38, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(38, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #39: PEL InverterOn Turbo DC Ultimate T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(39, 1, 'InverterOn Turbo DC Ultimate Series', 'PEL InverterOn Turbo DC Ultimate T3 (H&C) Air Conditioner', 'pel-inverteron-turbo-dc-ultimate-h-c-air-conditioner', 'eshoppel', 128900, 228900, 'PKR 128,900 - PKR 228,900', 'Experience supreme climate control with the PEL InverterOn Turbo DC Ultimate T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-turbo-dc-ultimate-h-c-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton | White / 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(39, 'White / 1 Ton', 'PEL-PEL-INVERTERON-TURBO-DC-ULTIMATE-H-C-AIR-CONDITIONER-44413684187285', 128900, 1),
(39, 'White / 1.5 Ton', 'PEL-PEL-INVERTERON-TURBO-DC-ULTIMATE-H-C-AIR-CONDITIONER-44413684220053', 164900, 1),
(39, 'White / 2 Ton', 'PEL-PEL-INVERTERON-TURBO-DC-ULTIMATE-H-C-AIR-CONDITIONER-44413704700053', 228900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(39, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(39, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(39, 'Hyper Rapid Cooling within 30 seconds'),
(39, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(39, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #40: PEL Chef Digital Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(40, 4, 'Grill Microwave Ovens', 'PEL Chef Digital Microwave Oven', 'pel-chef-microwave-oven-26-ltr', 'eshoppel', 29900, 33900, 'PKR 29,900 - PKR 33,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Chef Digital Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-chef-microwave-oven-26-ltr', '{"capacity_liters":"23 L, 26 L","type":"Grill Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(40, '23 L / Black', 'PMO 23 CHEF', 29900, 1),
(40, '26 L / Black', 'PMO 26 CHEF', 33900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(40, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(40, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(40, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(40, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(40, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #41: PEL Convection Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(41, 4, 'Convection & Air Fryer Microwave Ovens', 'PEL Convection Microwave Oven', 'pel-convection-microwave', 'eshoppel', 39900, 44900, 'PKR 39,900 - PKR 44,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Convection Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-convection-microwave', '{"capacity_liters":"25 LTR, 30 LTR","type":"Convection & Air Fryer Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(41, '25 LTR', 'PEL-PEL-CONVECTION-MICROWAVE-42933943468181', 39900, 1),
(41, '30 LTR', 'PEL-PEL-CONVECTION-MICROWAVE-45423296577685', 44900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(41, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(41, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(41, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(41, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(41, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #42: PEL Silver Line 23 LTR Microwave Oven Digital
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(42, 4, 'Solo / Manual / Digital Microwave Ovens', 'PEL Silver Line 23 LTR Microwave Oven Digital', 'pel-silver-line-microwave-digital', 'eshoppel', 27900, 27900, 'PKR 27,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Silver Line 23 LTR Microwave Oven Digital. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-silver-line-microwave-digital', '{"capacity_liters":"Black","type":"Solo / Manual / Digital Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(42, 'Black / 23 LTR', 'PEL-PEL-SILVER-LINE-MICROWAVE-DIGITAL-42933074526357', 27900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(42, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(42, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(42, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(42, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(42, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #43: Panasonic XKF Inverter T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(43, 1, 'Panasonic Inverter (PEL Partner)', 'Panasonic XKF Inverter T3 (H&C) Air Conditioner', 'panasonic-inverter-air-conditioner', 'eshoppel', 146900, 261900, 'PKR 146,900 - PKR 261,900', 'Experience supreme climate control with the Panasonic XKF Inverter T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/panasonic-inverter-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton | White / 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"No / Optional","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(43, 'White / 1 Ton', 'PEL-PANASONIC-INVERTER-AIR-CONDITIONER-42841709510805', 146900, 1),
(43, 'White / 1.5 Ton', 'PEL-PANASONIC-INVERTER-AIR-CONDITIONER-42841709543573', 192900, 0),
(43, 'White / 2 Ton', 'PEL-PANASONIC-INVERTER-AIR-CONDITIONER-42841709576341', 261900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(43, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(43, 'Smart 4D Airflow & High-efficiency Gold Fin Condenser'),
(43, 'Hyper Rapid Cooling within 30 seconds'),
(43, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(43, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #44: PEL InverterOn Jumbo DC Prime Wifi T3 (H&C) Air Conditioner
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(44, 1, 'InverterOn Jumbo DC Prime Series', 'PEL InverterOn Jumbo DC Prime Wifi T3 (H&C) Air Conditioner', 'pel-inverteron-jumbo-dc-prime-wifi-t3-air-conditioner', 'eshoppel', 138900, 232900, 'PKR 138,900 - PKR 232,900', 'Experience supreme climate control with the PEL InverterOn Jumbo DC Prime Wifi T3 (H&C) Air Conditioner. Powered by advanced T3 Full DC Inverter technology and ultra-fast cooling, this energy-efficient AC delivers powerful airflow and year-round performance across Pakistani summers.', 'https://eshop.pel.com.pk/products/pel-inverteron-jumbo-dc-prime-wifi-t3-air-conditioner', '{"capacities_available":"White","tonnage_options":"White / 1 Ton | White / 1.5 Ton | White / 2 Ton","compressor_type":"T3 Full DC Inverter Tropicalized Compressor","operating_mode":"Heat & Cool (All Seasons)","voltage_operation":"Low Voltage Startup (Down to 140V - 160V)","refrigerant":"Eco-Friendly R410A / R32","wifi_smart":"Yes (PEL Smart App Enabled)","energy_saving":"Up to 65% - 75% Energy Efficiency (A+++ rating)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(44, 'White / 1 Ton', 'PEL-PEL-INVERTERON-JUMBO-DC-PRIME-WIFI-T3-AIR-CONDITIONER-43535652520085', 138900, 1),
(44, 'White / 1.5 Ton', 'PEL-PEL-INVERTERON-JUMBO-DC-PRIME-WIFI-T3-AIR-CONDITIONER-42840623841429', 181900, 1),
(44, 'White / 2 Ton', 'PEL-PEL-INVERTERON-JUMBO-DC-PRIME-WIFI-T3-AIR-CONDITIONER-42840623677589', 232900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(44, 'T3 Extreme Climate Tropical Compressor cooling up to 53°C'),
(44, 'Built-in Wi-Fi Smart Control via Smartphone App'),
(44, 'Hyper Rapid Cooling within 30 seconds'),
(44, 'Full DC Inverter with up to 65%+ Electricity Savings'),
(44, 'Self-Cleaning Evaporator & Anti-Bacterial Air Filtration');

-- Product #45: PEL Vertical Deep Freezer
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(45, 2, 'Vertical Deep Freezers', 'PEL Vertical Deep Freezer', 'pel-vertical-deep-freezer', 'eshoppel', 89900, 92900, 'PKR 89,900 - PKR 92,900', 'Upgrade your kitchen with the PEL Vertical Deep Freezer. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-vertical-deep-freezer', '{"available_sizes_liters":"Grey","technology":"Direct Cool High Efficiency","cooling_system":"No Frost / Direct Cool Frost Free Air Tower","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(45, 'Grey / 6D (239 LTR)', 'PVF 6D', 89900, 1),
(45, 'Grey / 7D (281 LTR)', 'PVF 7D', 92900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(45, 'Super Fast Ice Making within 25 Minutes'),
(45, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(45, 'LVS Technology protecting from severe voltage spikes'),
(45, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(45, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #46: PEL Arctic Pro Deep Freezer - Twin Door
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(46, 2, 'Arctic Pro Deep Freezers', 'PEL Arctic Pro Deep Freezer - Twin Door', 'pel-arctic-pro-deep-freezer-twin-door', 'eshoppel', 89900, 95900, 'PKR 89,900 - PKR 95,900', 'Upgrade your kitchen with the PEL Arctic Pro Deep Freezer - Twin Door. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-arctic-pro-deep-freezer-twin-door', '{"available_sizes_liters":"White, Light Grey","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(46, 'White / 135 (370 LTR)', '135 Deep Freezer', 89900, 0),
(46, 'White / 155 (410 LTR)', '155 Deep Freezer', 95900, 1),
(46, 'Light Grey / 135 (370 LTR)', 'PEL-PEL-ARCTIC-PRO-DEEP-FREEZER-TWIN-DOOR-47245613400213', 89900, 0),
(46, 'Light Grey / 155 (410 LTR)', 'PEL-PEL-ARCTIC-PRO-DEEP-FREEZER-TWIN-DOOR-47245613432981', 95900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(46, 'Super Fast Ice Making within 25 Minutes'),
(46, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(46, 'LVS Technology protecting from severe voltage spikes'),
(46, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(46, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #47: PEL Arctic Pro Deep Freezer - Single Door
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(47, 2, 'Arctic Pro Deep Freezers', 'PEL Arctic Pro Deep Freezer - Single Door', 'pel-arctic-pro-deep-freezer-single-door', 'eshoppel', 76900, 93900, 'PKR 76,900 - PKR 93,900', 'Upgrade your kitchen with the PEL Arctic Pro Deep Freezer - Single Door. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-arctic-pro-deep-freezer-single-door', '{"available_sizes_liters":"White, Light Grey","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(47, 'White / 100 (275 LTR)', '100 Deep Freezer', 76900, 1),
(47, 'White / 130 (370 LTR)', '130 Deep Freezer', 84900, 1),
(47, 'White / 150 (410 LTR)', '150 Deep Freezer', 93900, 1),
(47, 'Light Grey / 100 (275 LTR)', 'PEL-PEL-ARCTIC-PRO-DEEP-FREEZER-SINGLE-DOOR-47245614973077', 76900, 0),
(47, 'Light Grey / 130 (370 LTR)', 'PEL-PEL-ARCTIC-PRO-DEEP-FREEZER-SINGLE-DOOR-47245615005845', 84900, 1),
(47, 'Light Grey / 150 (410 LTR)', 'PEL-PEL-ARCTIC-PRO-DEEP-FREEZER-SINGLE-DOOR-47245615038613', 93900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(47, 'Super Fast Ice Making within 25 Minutes'),
(47, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(47, 'LVS Technology protecting from severe voltage spikes'),
(47, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(47, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #48: PEL Washing Machine Fully Auto
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(48, 6, 'Fully Automatic Washing Machines', 'PEL Washing Machine Fully Auto', 'pel-washing-machine-fully-auto', 'eshoppel', 67900, 81900, 'PKR 67,900 - PKR 81,900', 'Keep your clothes spotless and fresh with the PEL Washing Machine Fully Auto. Equipped with advanced fabric-care wash cycles, powerful motor torque, and energy-efficient operation, laundry day becomes quick and effortless.', 'https://eshop.pel.com.pk/products/pel-washing-machine-fully-auto', '{"capacity_kg":"Metallic Grey, Golden","type":"Fully Automatic Washing Machines","tub_design":"Diamond Stainless Steel Drum","motor_type":"Heavy-Duty Copper Winding Motor","pulsator":"Super Wave Pulsator for Deep Cleaning & Fabric Care","water_levels":"Multi-Level Intelligent Water & Load Sensing"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(48, 'Metallic Grey / 900', '900 - Grey Metallic', 67900, 1),
(48, 'Metallic Grey / 1100', '1100 - Grey Metallic', 81900, 1),
(48, 'Golden / 900', '900 - Golden', 67900, 0),
(48, 'Golden / 1100', '1100 - Golden', 81900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(48, 'Fuzzy Logic One-Touch Automated Wash, Rinse, and Spin Cycles'),
(48, 'Child Lock Protection and Auto-Restart Memory during power cuts'),
(48, 'Air Dry Technology for super fast garment drying in Pakistani weather'),
(48, 'Rust-Proof, Corrosion-Proof Double Wall Polypropylene Body'),
(48, 'Super Silent Vibration-Dampened Suspension System');

-- Product #49: PEL Washing Machine Semi Auto Twin Tub
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(49, 6, 'Semi-Automatic Twin Tub Washers', 'PEL Washing Machine Semi Auto Twin Tub', 'pel-washing-machine-semi-auto-twin-tub', 'eshoppel', 40900, 40900, 'PKR 40,900', 'Keep your clothes spotless and fresh with the PEL Washing Machine Semi Auto Twin Tub. Equipped with advanced fabric-care wash cycles, powerful motor torque, and energy-efficient operation, laundry day becomes quick and effortless.', 'https://eshop.pel.com.pk/products/pel-washing-machine-semi-auto-twin-tub', '{"capacity_kg":"White, Green","type":"Semi-Automatic Twin Tub Washers","tub_design":"Durable Rust-Free Fiber Plastic Tub","motor_type":"Heavy-Duty Copper Winding Motor","pulsator":"Super Wave Pulsator for Deep Cleaning & Fabric Care","water_levels":"Multi-Level Intelligent Water & Load Sensing"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(49, 'White / 1050 SA', '1050T Twin Tub - White', 40900, 1),
(49, 'Green / 1050 SA', '1050T Twin Tub - Green', 40900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(49, 'High-Power Turbo Jet Pulsator eliminating tough fabric stains'),
(49, 'Child Lock Protection and Auto-Restart Memory during power cuts'),
(49, 'Air Dry Technology for super fast garment drying in Pakistani weather'),
(49, 'Rust-Proof, Corrosion-Proof Double Wall Polypropylene Body'),
(49, 'Super Silent Vibration-Dampened Suspension System');

-- Product #50: PEL Washing Machine Semi Auto
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(50, 6, 'Semi-Automatic Single Tub Spinners / Washers', 'PEL Washing Machine Semi Auto', 'pel-washing-machine-semi-auto', 'eshoppel', 26500, 28900, 'PKR 26,500 - PKR 28,900', 'Keep your clothes spotless and fresh with the PEL Washing Machine Semi Auto. Equipped with advanced fabric-care wash cycles, powerful motor torque, and energy-efficient operation, laundry day becomes quick and effortless.', 'https://eshop.pel.com.pk/products/pel-washing-machine-semi-auto', '{"capacity_kg":"White, Green","type":"Semi-Automatic Single Tub Spinners / Washers","tub_design":"Durable Rust-Free Fiber Plastic Tub","motor_type":"Heavy-Duty Copper Winding Motor","pulsator":"Super Wave Pulsator for Deep Cleaning & Fabric Care","water_levels":"Multi-Level Intelligent Water & Load Sensing"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(50, 'White / 8050 SA', '8050 - White Lid', 26500, 1),
(50, 'White / 1250 SA', '1250 - White Lid', 28900, 0),
(50, 'Green / 8050 SA', '8050 - Green Lid', 26500, 1),
(50, 'Green / 1250 SA', '1250 - Green Lid', 28900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(50, 'High-Power Turbo Jet Pulsator eliminating tough fabric stains'),
(50, 'Child Lock Protection and Auto-Restart Memory during power cuts'),
(50, 'Air Dry Technology for super fast garment drying in Pakistani weather'),
(50, 'Rust-Proof, Corrosion-Proof Double Wall Polypropylene Body'),
(50, 'Super Silent Vibration-Dampened Suspension System');

-- Product #51: PEL Arctic InverterOn Deep Freezer - Twin Door
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(51, 2, 'Arctic InverterOn Deep Freezers', 'PEL Arctic InverterOn Deep Freezer - Twin Door', 'pel-arctic-inverteron-deep-freezer-twin-door', 'eshoppel', 96500, 101900, 'PKR 96,500 - PKR 101,900', 'Upgrade your kitchen with the PEL Arctic InverterOn Deep Freezer - Twin Door. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-arctic-inverteron-deep-freezer-twin-door', '{"available_sizes_liters":"White, Light Grey","technology":"InverterOn / Digitron Ultra Smart Inverter","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(51, 'White / 370 LTR', 'Deep Freezer 135', 96500, 0),
(51, 'White / 410 LTR', 'Deep Freezer 155', 101900, 1),
(51, 'Light Grey / 370 LTR', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-TWIN-DOOR-47245616775317', 96500, 0),
(51, 'Light Grey / 410 LTR', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-TWIN-DOOR-47245616808085', 101900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(51, 'InverterOn Smart Variable Speed Compressor (Up to 55% power saving)'),
(51, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(51, 'LVS Technology protecting from severe voltage spikes'),
(51, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(51, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #52: PEL Arctic InverterOn Deep Freezer - Single Door
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(52, 2, 'Arctic InverterOn Deep Freezers', 'PEL Arctic InverterOn Deep Freezer - Single Door', 'pel-arctic-inverteron-deep-freezer', 'eshoppel', 82900, 109900, 'PKR 82,900 - PKR 109,900', 'Upgrade your kitchen with the PEL Arctic InverterOn Deep Freezer - Single Door. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-arctic-inverteron-deep-freezer', '{"available_sizes_liters":"White, Light Grey","technology":"InverterOn / Digitron Ultra Smart Inverter","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(52, 'White / 100 (275 LTR)', '100 Deep Freezer', 82900, 1),
(52, 'White / 130 (370) LTR', '130 Deep Freezer', 90900, 1),
(52, 'White / 150 (410 LTR)', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-44770501722261', 99900, 1),
(52, 'White / 180 (495 LTR)', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-46071638098069', 109900, 1),
(52, 'Light Grey / 100 (275 LTR)', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-47245617463445', 82900, 0),
(52, 'Light Grey / 130 (370) LTR', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-47245617496213', 90900, 0),
(52, 'Light Grey / 150 (410 LTR)', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-47245617528981', 99900, 0),
(52, 'Light Grey / 180 (495 LTR)', 'PEL-PEL-ARCTIC-INVERTERON-DEEP-FREEZER-47245617561749', 109900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(52, 'InverterOn Smart Variable Speed Compressor (Up to 55% power saving)'),
(52, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(52, 'LVS Technology protecting from severe voltage spikes'),
(52, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(52, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #53: PEL Life Pro Refrigerator Room Series
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(53, 2, 'Room Series (Compact/Bedroom Refrigerator)', 'PEL Life Pro Refrigerator Room Series', 'pel-life-pro-refrigerator-room-series', 'eshoppel', 47500, 51500, 'PKR 47,500 - PKR 51,500', 'Upgrade your kitchen with the PEL Life Pro Refrigerator Room Series. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-life-pro-refrigerator-room-series', '{"available_sizes_liters":"ROYAL TEXTURE GREY (RTG)","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(53, 'ROYAL TEXTURE GREY (RTG) / 1100 (110 LTR)', 'PLP1100-BMG', 47500, 1),
(53, 'ROYAL TEXTURE GREY (RTG) / 1400 (140 LTR)', 'PLP1400-BMG', 51500, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(53, 'Super Fast Ice Making within 25 Minutes'),
(53, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(53, 'LVS Technology protecting from severe voltage spikes'),
(53, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(53, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #54: PEL 215 Pearl Water Dispenser (Without Refrigerator Compartment)
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(54, 2, 'Direct Cool Refrigerators', 'PEL 215 Pearl Water Dispenser (Without Refrigerator Compartment)', 'pel-215-pearl-water-dispenser', 'eshoppel', 35500, 35500, 'PKR 35,500', 'Upgrade your kitchen with the PEL 215 Pearl Water Dispenser (Without Refrigerator Compartment). Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-215-pearl-water-dispenser', '{"available_sizes_liters":"White","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(54, 'White', 'PEL-PEL-215-PEARL-WATER-DISPENSER-42824112996501', 35500, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(54, 'Super Fast Ice Making within 25 Minutes'),
(54, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(54, 'LVS Technology protecting from severe voltage spikes'),
(54, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(54, 'Premium Metallic VCM Steel Rust-Free Body');

-- Product #55: PEL 316 Premier Water Dispenser
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(55, 3, 'Smart & Classic 3-Tap Water Dispensers', 'PEL 316 Premier Water Dispenser', 'pel-316-premier-water-dispenser', 'eshoppel', 37500, 37500, 'PKR 37,500', 'Enjoy refreshing chilled and instant hot water with the PEL 316 Premier Water Dispenser. Designed with food-grade stainless steel tanks, robust compressor cooling, and elegant aesthetics, it is perfect for homes and offices.', 'https://eshop.pel.com.pk/products/pel-316-premier-water-dispenser', '{"taps":"3 Taps (Hot, Normal, Cold Water)","refrigerator_compartment":"Yes (Spacious Lower Refrigerator Cabinet)","compressor":"High-Efficiency Tropicalized Compressor","tank_material":"100% Food-Grade Stainless Steel Water Tank (Rust-Proof)","cooling_capacity":"2.5 - 3.5 L/hr (Cold ≤ 10°C)","heating_capacity":"5.0 L/hr (Hot ≥ 90°C)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(55, 'White', 'PEL-PEL-316-PREMIER-WATER-DISPENSER-42824111751317', 37500, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(55, '3-Tap Convenience with instant Hot, Ambient, and Chilled water'),
(55, 'Durable High-Impact Rust-Proof ABS Body'),
(55, 'Child Safety Lock on Hot Water Dispensing Faucet'),
(55, 'Low Noise Eco-Friendly Compressor with Overheat Protection'),
(55, 'Spacious Chilling Refrigerator Compartment for Beverages & Snacks');

-- Product #56: PEL 315 Smart Water Dispenser
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(56, 3, 'Smart & Classic 3-Tap Water Dispensers', 'PEL 315 Smart Water Dispenser', 'pel-315-smart-water-dispenser', 'eshoppel', 36500, 36500, 'PKR 36,500', 'Enjoy refreshing chilled and instant hot water with the PEL 315 Smart Water Dispenser. Designed with food-grade stainless steel tanks, robust compressor cooling, and elegant aesthetics, it is perfect for homes and offices.', 'https://eshop.pel.com.pk/products/pel-315-smart-water-dispenser', '{"taps":"3 Taps (Hot, Normal, Cold Water)","refrigerator_compartment":"Yes (Spacious Lower Refrigerator Cabinet)","compressor":"High-Efficiency Tropicalized Compressor","tank_material":"100% Food-Grade Stainless Steel Water Tank (Rust-Proof)","cooling_capacity":"2.5 - 3.5 L/hr (Cold ≤ 10°C)","heating_capacity":"5.0 L/hr (Hot ≥ 90°C)"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(56, 'White', 'PEL-PEL-315-SMART-WATER-DISPENSER-42824106868885', 36500, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(56, '3-Tap Convenience with instant Hot, Ambient, and Chilled water'),
(56, 'Durable High-Impact Rust-Proof ABS Body'),
(56, 'Child Safety Lock on Hot Water Dispensing Faucet'),
(56, 'Low Noise Eco-Friendly Compressor with Overheat Protection'),
(56, 'Spacious Chilling Refrigerator Compartment for Beverages & Snacks');

-- Product #57: PEL Glamour Microwave Oven 30 Ltr
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(57, 4, 'Grill Microwave Ovens', 'PEL Glamour Microwave Oven 30 Ltr', 'pel-glamour-microwave', 'eshoppel', 36900, 36900, 'PKR 36,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Glamour Microwave Oven 30 Ltr. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-glamour-microwave', '{"capacity_liters":"30 LTR","type":"Grill Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(57, '30 LTR', 'Pel Glamour 30ltr Grill', 36900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(57, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(57, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(57, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(57, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(57, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #58: PEL Silver Line 23 LTR Microwave Oven Manual
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(58, 4, 'Solo / Manual / Digital Microwave Ovens', 'PEL Silver Line 23 LTR Microwave Oven Manual', 'pel-silver-line-microwave-manual', 'eshoppel', 25900, 25900, 'PKR 25,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Silver Line 23 LTR Microwave Oven Manual. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-silver-line-microwave-manual', '{"capacity_liters":"Black","type":"Solo / Manual / Digital Microwave Ovens","control_panel":"Mechanical Rotary Dials","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(58, 'Black / 23 LTR', 'Silver Line Black Manual 23ltr', 25900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(58, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(58, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(58, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(58, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(58, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #59: PEL Desire Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(59, 4, 'Grill Microwave Ovens', 'PEL Desire Microwave Oven', 'pel-desire-microwave', 'eshoppel', 29900, 36900, 'PKR 29,900 - PKR 36,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Desire Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-desire-microwave', '{"capacity_liters":"Black","type":"Grill Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(59, 'Black / 23 LTR', 'Desire Black 23ltr', 29900, 1),
(59, 'Black / 26 LTR', 'Desire Black 26ltr', 32900, 1),
(59, 'Black / 30 LTR', 'Desire Black 30ltr', 36900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(59, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(59, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(59, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(59, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(59, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #60: PEL Classic Microwave
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(60, 4, 'Solo / Manual / Digital Microwave Ovens', 'PEL Classic Microwave', 'pel-classic-microwave', 'eshoppel', 17900, 17900, 'PKR 17,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Classic Microwave. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-classic-microwave', '{"capacity_liters":"White, Black","type":"Solo / Manual / Digital Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(60, 'White / 20 LTR', 'Classic White 20ltr', 17900, 0),
(60, 'Black / 20 LTR', 'Classic Black 20ltr', 17900, 1);
INSERT INTO product_features (product_id, feature_text) VALUES
(60, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(60, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(60, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(60, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(60, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #61: PEL Classic Plus Microwave Oven
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(61, 4, 'Solo / Manual / Digital Microwave Ovens', 'PEL Classic Plus Microwave Oven', 'pel-classic-plus-microwave', 'eshoppel', 17900, 17900, 'PKR 17,900', 'Cook, bake, reheat, and grill delicious meals effortlessly with the PEL Classic Plus Microwave Oven. Combining smart preset cooking menus with rapid heating technology, this microwave delivers chef-quality results in minutes.', 'https://eshop.pel.com.pk/products/pel-classic-plus-microwave', '{"capacity_liters":"Black, White","type":"Solo / Manual / Digital Microwave Ovens","control_panel":"Digital Touch Panel with LED Display","cooking_modes":"Solo Microwave, Defrost, Express Cook","power_levels":"5 to 10 Multi-Stage Power Levels","safety":"Child Safety Lock & Pull-to-Open Door"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(61, 'Black / 20 LTR', 'Classic Plus Black 20ltr', 17900, 1),
(61, 'White / 20 LTR', 'Classic Plus White 20ltr', 17900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(61, 'Built-in Auto Cook Pakistani & Continental Recipes Menu'),
(61, 'Speedy & Weight Defrosting Mechanism for Meat and Frozen Foods'),
(61, 'Anti-Bacterial Easy-Clean Cavity with High Temperature Resistance'),
(61, 'Express Cooking with Precision Digital Timer & Sound Alert'),
(61, 'Sleek Mirror Glass Finish and Ergonomic Handle Design');

-- Product #62: PEL Smart Washing Machine Fully Auto
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(62, 6, 'Smart IoT Fully Automatic Washing Machines', 'PEL Smart Washing Machine Fully Auto', 'pel-washing-machine-smart-fully', 'eshoppel', 72900, 85900, 'PKR 72,900 - PKR 85,900', 'Keep your clothes spotless and fresh with the PEL Smart Washing Machine Fully Auto. Equipped with advanced fabric-care wash cycles, powerful motor torque, and energy-efficient operation, laundry day becomes quick and effortless.', 'https://eshop.pel.com.pk/products/pel-washing-machine-smart-fully', '{"capacity_kg":"Metallic Grey","type":"Smart IoT Fully Automatic Washing Machines","tub_design":"Diamond Stainless Steel Drum","motor_type":"Direct Drive Smart Inverter Motor","pulsator":"Super Wave Pulsator for Deep Cleaning & Fabric Care","water_levels":"Multi-Level Intelligent Water & Load Sensing"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(62, 'Metallic Grey / 900i', '900i - Grey Metallic', 72900, 0),
(62, 'Metallic Grey / 1100i', '1100i - Grey Metallic', 85900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(62, 'Fuzzy Logic One-Touch Automated Wash, Rinse, and Spin Cycles'),
(62, 'Child Lock Protection and Auto-Restart Memory during power cuts'),
(62, 'Air Dry Technology for super fast garment drying in Pakistani weather'),
(62, 'Rust-Proof, Corrosion-Proof Double Wall Polypropylene Body'),
(62, 'Super Silent Vibration-Dampened Suspension System');

-- Product #63: PEL Life Pro Refrigerator
INSERT INTO products (id, category_id, sub_category, model_title, handle, vendor, min_price_pkr, max_price_pkr, price_range_pkr, seo_short_description, official_store_url, technical_specifications) VALUES
(63, 2, 'Life Pro Series (Direct Cool / Inverter)', 'PEL Life Pro Refrigerator', 'pel-life-pro-refrigerator', 'eshoppel', 63900, 103900, 'PKR 63,900 - PKR 103,900', 'Upgrade your kitchen with the PEL Life Pro Refrigerator. Featuring deep freezing technology, high-density insulation, and ultra-reliable low voltage startup, it preserves food freshness and locks in nutrients effortlessly.', 'https://eshop.pel.com.pk/products/pel-life-pro-refrigerator', '{"available_sizes_liters":"Metallic Golden Brown, Metallic Texture Grey, Gracious Graphite, Brushed Metallic Grey","technology":"Direct Cool High Efficiency","cooling_system":"Roll Bond Evaporator with Instant Freezing","voltage_regulator":"Built-in Voltage Stabilizer (Runs without external stabilizer 100V-260V)","insulation":"High-Density Thicker PUF Insulation for 6+ Hours Cold Retention","refrigerant":"R600a Environmentally Friendly Gas"}');
INSERT INTO product_variants (product_id, variant_title, sku, price_pkr, available) VALUES
(63, 'Metallic Golden Brown / 2000 (168 LTR)', '2000 Metallic Golden Brown', 63900, 0),
(63, 'Metallic Golden Brown / 2200 (194 LTR)', '2200 Metallic Golden Brown', 70900, 0),
(63, 'Metallic Golden Brown / 2350 (240 LTR)', '2350 Metallic Golden Brown', 77900, 1),
(63, 'Metallic Golden Brown / 2550 (260 LTR)', '2550 Metallic Golden Brown', 80900, 1),
(63, 'Metallic Golden Brown / 6360 (310 LTR)', '6360 Metallic Golden Brown', 89900, 1),
(63, 'Metallic Golden Brown / 6460 (334 LTR)', '6460 Metallic Golden Brown', 92900, 1),
(63, 'Metallic Golden Brown / 21860 (354 LTR)', '21860 Metallic Golden Brown', 98900, 0),
(63, 'Metallic Golden Brown / 22260 (408 LTR)', '22260 Metallic Golden Brown', 103900, 0),
(63, 'Metallic Texture Grey / 2000 (168 LTR)', '2000 Metallic Texture Grey', 63900, 0),
(63, 'Metallic Texture Grey / 2200 (194 LTR)', '2200 Metallic Texture Grey', 70900, 0),
(63, 'Metallic Texture Grey / 2350 (240 LTR)', '2350 Metallic Texture Grey', 77900, 1),
(63, 'Metallic Texture Grey / 2550 (260 LTR)', '2550 Metallic Texture Grey', 80900, 1),
(63, 'Metallic Texture Grey / 6360 (310 LTR)', '6360 Metallic Texture Grey', 89900, 1),
(63, 'Metallic Texture Grey / 6460 (334 LTR)', '6460 Metallic Texture Grey', 92900, 1),
(63, 'Metallic Texture Grey / 21860 (354 LTR)', '21860 Metallic Texture Grey', 98900, 0),
(63, 'Metallic Texture Grey / 22260 (408 LTR)', '22260 Metallic Texture Grey', 103900, 1),
(63, 'Gracious Graphite / 2000 (168 LTR)', '2000 Gracious Grey', 63900, 0),
(63, 'Gracious Graphite / 2200 (194 LTR)', '2200 Gracious Grey', 70900, 0),
(63, 'Gracious Graphite / 2350 (240 LTR)', '2350 Gracious Grey', 77900, 0),
(63, 'Gracious Graphite / 2550 (260 LTR)', '2550 Gracious Grey', 80900, 0),
(63, 'Gracious Graphite / 6360 (310 LTR)', '6360 Gracious  Grey', 89900, 0),
(63, 'Gracious Graphite / 6460 (334 LTR)', '6460 Gracious Grey', 92900, 0),
(63, 'Gracious Graphite / 21860 (354 LTR)', '21860 Gracious Grey', 98900, 0),
(63, 'Gracious Graphite / 22260 (408 LTR)', '22260 Gracious Grey', 103900, 0),
(63, 'Brushed Metallic Grey / 2000 (168 LTR)', '2000 Brushed Metallic Grey', 63900, 0),
(63, 'Brushed Metallic Grey / 2200 (194 LTR)', '2200 Brushed Metallic Grey', 70900, 0),
(63, 'Brushed Metallic Grey / 2350 (240 LTR)', '2350 Brushed Metallic Grey', 77900, 0),
(63, 'Brushed Metallic Grey / 2550 (260 LTR)', '2550 Brushed Metallic Grey', 80900, 0),
(63, 'Brushed Metallic Grey / 6360 (310 LTR)', '6360 Brushed Metallic Grey', 89900, 0),
(63, 'Brushed Metallic Grey / 6460 (334 LTR)', '6460 Brushed Metallic Grey', 92900, 0),
(63, 'Brushed Metallic Grey / 21860 (354 LTR)', '21860 Brushed Metallic Grey', 98900, 0),
(63, 'Brushed Metallic Grey / 22260 (408 LTR)', '22260 Brushed Metallic Grey', 103900, 0);
INSERT INTO product_features (product_id, feature_text) VALUES
(63, 'Super Fast Ice Making within 25 Minutes'),
(63, 'Food Grade Anti-Bacterial Gasket and Toughened Glass / VCM Shelves'),
(63, 'LVS Technology protecting from severe voltage spikes'),
(63, 'Thickest Insulated Walls ensuring sub-zero cold retention during load shedding'),
(63, 'Premium Metallic VCM Steel Rust-Free Body');

