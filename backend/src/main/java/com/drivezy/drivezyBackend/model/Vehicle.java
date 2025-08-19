package com.drivezy.drivezyBackend.model;

//import com.drivezy.drivezyBackend.enums.Location;
import com.drivezy.drivezyBackend.enums.VehicleCategory;
import com.drivezy.drivezyBackend.enums.VehicleType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal pricePerDay;

//    @Enumerated(EnumType.STRING)
    @NotNull
//    @Column(length = 255) 
    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Column(unique = true)
    private String vehicleNumber;
    
    @Column(nullable = false)
    private boolean approved = false;


    

	private boolean geared;

    @NotBlank
    private String color;

    @NotBlank
    private String vehicleBrand;

    @NotBlank
    private String vehicleModel;

    @Column(nullable = true)
    private String rcUrl;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<VehicleImage> images = new ArrayList<>();


    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_category", nullable = false)
    private VehicleCategory vehicleCategory;

    @Column(name = "security_amount", nullable = false)
    private Double securityAmount;



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
	
	

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public boolean isGeared() {
		return geared;
	}

	public void setGeared(boolean geared) {
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

	public List<VehicleImage> getImages() {
		return images;
	}

	public void setImages(List<VehicleImage> images) {
		this.images = images;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}
	
	public void addImage(String imageUrl) {
	    VehicleImage image = new VehicleImage();
	    image.setImageUrl(imageUrl);
	    image.setVehicle(this);  // bidirectional link
	    this.images.add(image);
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
    
}
