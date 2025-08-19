package com.drivezy.drivezyBackend.dto;

import com.drivezy.drivezyBackend.enums.Location;
import com.drivezy.drivezyBackend.enums.VehicleCategory;
import com.drivezy.drivezyBackend.model.Vehicle;
import com.drivezy.drivezyBackend.model.VehicleImage;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class VehicleWithUserResponse {
	
	 private Long id;
	    private String title;
	    private String description;
	    private BigDecimal pricePerDay;
	    private String location;
	    private String vehicleNumber;
	    private Boolean geared;
	    private String color;
	    private String vehicleBrand;
	    private String vehicleModel;
	    private String rcUrl;
	    private Long userId;
	    private String userName;
	    private Boolean approved;
	    private LocalDateTime createdAt;
	    private VehicleCategory vehicleCategory;
	    private Double securityAmount;
	    private List<VehicleImage> images;

	    public VehicleWithUserResponse() {}

	    public VehicleWithUserResponse(Vehicle v) {
	        this.id = v.getId();
	        this.title = v.getTitle();
	        this.description = v.getDescription();
	        this.pricePerDay = v.getPricePerDay();
	        this.location = v.getLocation();
	        this.vehicleNumber = v.getVehicleNumber();
	        this.geared = v.isGeared();
	        this.color = v.getColor();
	        this.vehicleBrand = v.getVehicleBrand();
	        this.vehicleModel = v.getVehicleModel();
	        this.rcUrl = v.getRcUrl();
	        this.userId = (v.getUser() != null) ? v.getUser().getId() : null;
	        this.userName = (v.getUser() != null) ? v.getUser().getName() : null;
	        this.approved = v.isApproved();
	        this.createdAt = v.getCreatedAt();
	        this.vehicleCategory = v.getVehicleCategory();
	        this.securityAmount = v.getSecurityAmount();
	        this.images = v.getImages();
	    }

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public BigDecimal getPricePerDay() {
			return pricePerDay;
		}

		public void setPricePerDay(BigDecimal pricePerDay) {
			this.pricePerDay = pricePerDay;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getVehicleNumber() {
			return vehicleNumber;
		}

		public void setVehicleNumber(String vehicleNumber) {
			this.vehicleNumber = vehicleNumber;
		}

		public Boolean getGeared() {
			return geared;
		}

		public void setGeared(Boolean geared) {
			this.geared = geared;
		}

		public String getColor() {
			return color;
		}

		public void setColor(String color) {
			this.color = color;
		}

		public String getVehicleBrand() {
			return vehicleBrand;
		}

		public void setVehicleBrand(String vehicleBrand) {
			this.vehicleBrand = vehicleBrand;
		}

		public String getVehicleModel() {
			return vehicleModel;
		}

		public void setVehicleModel(String vehicleModel) {
			this.vehicleModel = vehicleModel;
		}

		public String getRcUrl() {
			return rcUrl;
		}

		public void setRcUrl(String rcUrl) {
			this.rcUrl = rcUrl;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public Boolean getApproved() {
			return approved;
		}

		public void setApproved(Boolean approved) {
			this.approved = approved;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public VehicleCategory getVehicleCategory() {
			return vehicleCategory;
		}

		public void setVehicleCategory(VehicleCategory vehicleCategory) {
			this.vehicleCategory = vehicleCategory;
		}

		public Double getSecurityAmount() {
			return securityAmount;
		}

		public void setSecurityAmount(Double securityAmount) {
			this.securityAmount = securityAmount;
		}

		public List<VehicleImage> getImages() {
			return images;
		}

		public void setImages(List<VehicleImage> images) {
			this.images = images;
		}
}
